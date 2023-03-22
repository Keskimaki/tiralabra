import { Options } from './types.ts'
import {
  getBoard,
  isGameOver,
  lastMoveToUci,
  move,
  UciToAn,
} from './util/chess.ts'
import { botMove, getCurrentGame, getGameState } from './util/lichess.ts'
import calculateMove from './ai/main.ts'

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

const showBoard = () => {
  const board = getBoard()

  console.clear()
  console.log(board)
}

const getPlayerMove = async (gameId: string) => {
  const lastLocalMove = lastMoveToUci()

  let counter = 0
  while (true) {
    const gameState = await getGameState(gameId)
    const playerMove = gameState.state.moves.split(' ').at(-1)

    if (playerMove !== lastLocalMove) return UciToAn(playerMove)

    console.log('Waiting for player move...')

    counter += 1
    await sleep(Math.min(counter * 1000, 5000))
  }
}

const playerTurn = async (gameId: string) => {
  showBoard()
  const playerMove = await getPlayerMove(gameId)

  move(playerMove)
}

const aiTurn = async (gameId: string) => {
  const aiMove = calculateMove()

  move(aiMove)
  await botMove(gameId)
}

export const run = async (_options: Options) => {
  const { gameId } = await getCurrentGame()

  while (!isGameOver()) {
    await playerTurn(gameId)

    await aiTurn(gameId)
  }
}

export default run
