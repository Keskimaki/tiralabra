import { assertEquals } from 'std/testing/asserts.ts'

import calculateMove, { evaluateBoard } from '../src/ai/main.ts'
import { chess, reset } from '../src/util/chess.ts'

Deno.test('Evaluate board works', async (t) => {
  await t.step('Starting board is equal', () => {
    const board = chess.board()

    const whiteScore = evaluateBoard(board, 'w')
    const blackScore = evaluateBoard(board, 'b')

    assertEquals(whiteScore, blackScore)
  })

  await t.step('Missing a piece is a worse position', () => {
    chess.remove('e2')

    const board = chess.board()

    const whiteScore = evaluateBoard(board, 'w')
    const blackScore = evaluateBoard(board, 'b')

    assertEquals(blackScore > whiteScore, true)
  })

  reset()
})

Deno.test('Minimax returns a valid move', () => {
  const move = calculateMove('w')

  chess.move(move, { strict: true })
  const lastMove = chess.history().pop()

  assertEquals(move, lastMove)
})
