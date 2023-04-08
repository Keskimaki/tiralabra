// deno-lint-ignore-file no-explicit-any
import { Board, Color, Game, Move, Options } from './types.ts'
import { botMove, gameStream, getCurrentGame } from './util/lichess.ts'
import calculateMove from './ai/main.ts'
import { initializeGame, move } from './chess/main.ts'

const showBoard = (board: Board) => {
  console.clear()

  // TODO: Prettier board visualization
  console.log(
    board.map((row: any) =>
      row.map(({ type }: any) => type ? type : '#').join(' ')
    ).join('\n'),
  )
}

const aiTurn = async (game: Game, color: Color): Promise<Move> => {
  showBoard(game.board)
  console.log('Calculating move...')
  const aiMove = calculateMove(game, color)

  const gameState = move(game, aiMove)
  await botMove(game.gameId, aiMove)

  showBoard(gameState.board)
  console.log('Waiting for player move...')

  return aiMove
}

/** Continuously read game stream until new player move is found */
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

const getMoves = (gameState: any) => {
  if (!['gameFull', 'gameState'].includes(gameState.type)) return []

  const { moves } = gameState.type === 'gameFull' ? gameState.state : gameState

  return moves.split(' ')
}

const gameLoop = async (gameId: string, aiColor: Color) => {
  const stream = await gameStream(gameId)

  let lastLocalMove
  while (true) {
    const gameState = await getGameState(stream)
    if (!gameState) continue

    const moves = getMoves(gameState)
    const lastMove = moves.at(-1)

    if (lastMove && lastMove !== lastLocalMove) {
      const game = initializeGame(gameId, moves)

      lastLocalMove = await aiTurn(game, aiColor)
    }
  }
}

export const run = async (options: Options) => {
  const { color } = options

  console.log('Starting game...')
  const { gameId } = await getCurrentGame()
  const game = initializeGame(gameId)

  if (color === 'w') await aiTurn(game, color)

  await gameLoop(gameId, color)
}

export default run
