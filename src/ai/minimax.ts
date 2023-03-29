import { Chess } from 'chess'

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

  for (const possibleMove of chess.moves() as Move[]) {
    const tempChess = new Chess(chess.fen())
    tempChess.move(possibleMove, { strict: true })

    const { bestScore: score } = minimax(
      tempChess,
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

    if (beta <= alpha) break
  }

  return { bestMove, bestScore }
}

export default minimax
