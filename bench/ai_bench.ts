import { chess } from '../src/util/chess.ts'
import { evaluateBoard } from '../src/ai/main.ts'
import minimax from '../src/ai/minimax.ts'

Deno.bench('Eval function', () => {
  const board = chess.board()
  evaluateBoard(board, 'w')
})

for (let i = 1; i < 5; i++) {
  Deno.bench(`Minimax ${i} deep`, () => {
    minimax(chess, i, 'w')
  })
}
