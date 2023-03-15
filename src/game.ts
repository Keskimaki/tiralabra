import { Options } from './types.ts'
import { isGameOver, move, getBoard } from './util/chess.ts'
import { getMove } from './util/prompt.ts'
import calculateMove from './ai/main.ts'

const playerTurn = async () => {
  console.log(getBoard())

  const playerMove = await getMove()
  move(playerMove)
}

const aiTurn = () => {
  const aiMove = calculateMove()
  move(aiMove)
}

export const run = async (_options: Options) => {
  while (!isGameOver()) {
    await playerTurn()

    aiTurn()
  }
}

export default run
