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
  isMaximizingPlayer: boolean,
  color: Color,
): MinimaxResult => {
  if (depth === 0 || isGameOver()) {
    return { bestMove: null, bestScore: evaluateBoard(chess.board(), color) }
  }

  let bestMove: BestMove = null
  let bestScore = isMaximizingPlayer ? -Infinity : Infinity

  for (const possibleMove of chess.moves() as Move[]) {
    const tempChess = new Chess(chess.fen())
    tempChess.move(possibleMove, { strict: true })

    const { bestScore: score } = minimax(
      tempChess,
      depth - 1,
      !isMaximizingPlayer,
      color,
    )

    const isBetterScore = isMaximizingPlayer
      ? score > bestScore
      : score < bestScore

    if (isBetterScore) {
      bestScore = score
      bestMove = possibleMove
    }
  }

  return { bestMove, bestScore }
}

export default minimax
