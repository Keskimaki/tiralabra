import { evaluateBoard } from '../src/ai/main.ts'
import minimax from '../src/ai/minimax.ts'
import { initializeGame } from '../src/chess/main.ts'

Deno.bench('Eval function', () => {
  const { board } = initializeGame('test')
  evaluateBoard(board, 'w')
})

for (let i = 1; i < 5; i++) {
  const game = initializeGame('test')

  Deno.bench(`Minimax ${i} deep`, () => {
    minimax(game, i, 'w')
  })
}
