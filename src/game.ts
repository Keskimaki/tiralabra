import { Color, ColorOption, Move, Options } from './types.ts'
import {
  getBoard,
  getOtherColor,
  isGameOver,
  lastMoveToUci,
  move,
  UciToAn,
} from './util/chess.ts'
import { botMove, gameStream, getCurrentGame } from './util/lichess.ts'
import calculateMove from './ai/main.ts'

const showBoard = () => {
  const board = getBoard()

  console.clear()
  console.log(board)
}

const playerTurn = (playerMove: Move) => {
  move(UciToAn(playerMove))
  showBoard()

  showBoard()
}

const aiTurn = async (gameId: string, color: Color) => {
  console.log('Calculating move...')
  const aiMove = calculateMove(color)

  move(aiMove)
  await botMove(gameId)

  showBoard()
  console.log('Waiting for player move...')
}

const getGameState = async (
  stream: ReadableStreamDefaultReader<Uint8Array>,
) => {
  const decoder = new TextDecoder('utf-8')

  const row = await stream.read()
  const text = decoder.decode(row.value)

  try {
    const gameState = JSON.parse(text)
    return gameState
  } catch {
    return null
  }
}

// deno-lint-ignore no-explicit-any
const getLastMove = (gameState: any) => {
  if (!['gameFull', 'gameState'].includes(gameState.type)) return null

  const { moves } = gameState.type === 'gameFull' ? gameState.state : gameState
  const lastMove = moves.split(' ').at(-1)

  return lastMove
}

const gameLoop = async (gameId: string, aiColor: Color) => {
  const stream = await gameStream(gameId)

  while (!isGameOver()) {
    const lastLocalMove = lastMoveToUci()

    const gameState = await getGameState(stream)
    if (!gameState) continue

    const lastMove = getLastMove(gameState)

    if (lastMove !== lastLocalMove) {
      playerTurn(lastMove)
      await aiTurn(gameId, aiColor)
    }
  }
}

export const run = async (options: Options) => {
  const { color } = options
  const aiColor = getOtherColor(color)

  console.log('Starting game...')
  const { gameId } = await getCurrentGame()

  if (color === ColorOption.Black) await aiTurn(gameId, aiColor)

  await gameLoop(gameId, aiColor)
}

export default run
