import { Move } from '../types.ts'
import { getPossibleMoves, undo, move } from '../util/chess.ts'

const evaluateBoard = () => Math.floor(Math.random() * 10)

const calculateMove = (): Move => {
  let bestScore = -Infinity
  let bestMove = null

  for (const possibleMove of getPossibleMoves()) {
    move(possibleMove)
    const score = evaluateBoard() // call minimax here
    undo()

    if (score > bestScore) {
      bestScore = score
      bestMove = possibleMove
    }
  }

  if (!bestMove) throw new Error('No move found')

  return bestMove
}

export default calculateMove
