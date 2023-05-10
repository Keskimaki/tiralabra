import { writeAllSync } from 'std/streams/write_all.ts'

import { Color, Game, Move } from '../types.ts'
import { evaluateBoard } from './main.ts'
import { move, possibleMoves } from '../chess/main.ts'
import { getOtherColor } from '../chess/util.ts'

type BestMove = Move | null

interface MinimaxResult {
  bestMove: BestMove
  bestScore: number
}

let count = 0

const updateCount = () => {
  count++
  if (count % 1000 === 0) {
    writeAllSync(Deno.stdout, new TextEncoder().encode('\r\x1b[K'))
    writeAllSync(
      Deno.stdout,
      new TextEncoder().encode(`Search depth: ${count}`),
    )
  }
}

export const resetCount = () => {
  count = 0
}

/** Basic minimax algorithm with alpha-beta pruning */
const minimax = (
  game: Game,
  depth: number,
  color: Color,
  alpha = -Infinity,
  beta = Infinity,
  isMaximizingPlayer = true,
  noRandom = false,
): MinimaxResult => {
  updateCount()

  if (depth === 0) {
    const bestScore = evaluateBoard(game.board, color)
    return { bestMove: null, bestScore }
  }

  let bestMove: BestMove = null
  let bestScore = isMaximizingPlayer ? -Infinity : Infinity

  const moves = possibleMoves(game, color)
  if (!noRandom) moves.sort(() => 0.5 - Math.random())

  for (const possibleMove of moves) {
    const gameState = move(game, possibleMove)

    const { bestScore: score } = minimax(
      gameState,
      depth - 1,
      getOtherColor(color),
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
