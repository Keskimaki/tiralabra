import { Options } from './types.ts'
import { getBoard, isGameOver, move, UciToAlgebraic } from './util/chess.ts'
import { waitForPlayer } from './util/prompt.ts'
import calculateMove from './ai/main.ts'

import { botMove, getCurrentGame, getGameState } from './util/lichess.ts'

const showBoard = () => {
  const board = getBoard()

  console.clear()
  console.log(board)
}

const playerTurn = async (gameId: string) => {
  showBoard()

  const confirm = await waitForPlayer()
  if (!confirm) Deno.exit(0)

  const gameState = await getGameState(gameId)
  const playerMove = gameState.state.moves.split(' ').at(-1)

  move(UciToAlgebraic(playerMove))
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
