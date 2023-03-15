import { Options } from './types.ts'
import { isGameOver, move, getBoard } from './util/chess.ts'
import { getMove } from './util/prompt.ts'

export const run = async (_options: Options) => {
  while (!isGameOver()) {
    console.log(getBoard())

    const playerMove = await getMove()
    move(playerMove)
  }
}

export default run
