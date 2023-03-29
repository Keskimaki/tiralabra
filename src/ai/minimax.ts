import { Color, Move } from '../types.ts'
import { isGameOver } from '../util/chess.ts'
import { evaluateBoard } from './main.ts'

type BestMove = Move | null

interface MinimaxResult {
  bestMove: BestMove
  bestScore: number
}

const minimax = (
  // deno-lint-ignore no-explicit-any
  chess: any,
  depth: number,
  color: Color,
  alpha = -Infinity,
  beta = Infinity,
  isMaximizingPlayer = true,
): MinimaxResult => {
  if (depth === 0 || isGameOver()) {
    const bestScore = evaluateBoard(chess.board(), color)
    return { bestMove: null, bestScore }
  }

  let bestMove: BestMove = null
  let bestScore = isMaximizingPlayer ? -Infinity : Infinity

  const possibleMoves = chess.moves() as Move[]
  possibleMoves.sort(() => 0.5 - Math.random())

  for (const possibleMove of possibleMoves) {
    chess.move(possibleMove, { strict: true })

    const { bestScore: score } = minimax(
      chess,
      depth - 1,
      color,
      alpha,
      beta,
      !isMaximizingPlayer,
    )

    if (isMaximizingPlayer) {
      if (score > bestScore) {
        bestScore = score
        bestMove = possibleMove
      }

      alpha = Math.max(alpha, score)
    } else {
      if (score < bestScore) {
        bestScore = score
        bestMove = possibleMove
      }

      beta = Math.min(beta, score)
    }

    chess.undo()

    if (beta <= alpha) break
  }

  return { bestMove, bestScore }
}

export default minimax
