import { Options } from './types.ts'
import { getBoard, isGameOver, move } from './util/chess.ts'
import { getMove } from './util/prompt.ts'
import calculateMove from './ai/main.ts'

const showBoard = () => {
  const board = getBoard()

  console.clear()
  console.log(board)
}

const playerTurn = async () => {
  showBoard()

  const playerMove = await getMove()
  move(playerMove)
}

const aiTurn = async (gameId: string) => {
  const aiMove = calculateMove()

  move(aiMove)
  await botMove(gameId)
}

export const run = async (_options: Options) => {
  const botStatus = await getStatus()
  const gameId = botStatus.playing.split('/').at(-2)

  while (!isGameOver()) {
    await playerTurn()

    await aiTurn(gameId)
  }
}

export default run
