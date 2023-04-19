import { assertEquals } from 'std/testing/asserts.ts'

import calculateMove, { evaluateBoard } from '../src/ai/main.ts'
import { initializeGame, move, possibleMoves } from '../src/chess/main.ts'
import startingBoard from '../src/chess/board.ts'

Deno.test('Evaluate board works', async (t) => {
  await t.step('Starting board is equal', () => {
    const board = startingBoard

    const whiteScore = evaluateBoard(board, 'w')
    const blackScore = evaluateBoard(board, 'b')

    assertEquals(whiteScore, blackScore)
  })

  await t.step('Missing a piece is a worse position', () => {
    const board = structuredClone(startingBoard)
    board[1][4] = { square: 'e2' }

    const whiteScore = evaluateBoard(board, 'w')
    const blackScore = evaluateBoard(board, 'b')

    assertEquals(blackScore > whiteScore, true)
  })
})

Deno.test('Minimax returns a valid move', () => {
  const game = initializeGame('test')

  const moves = possibleMoves(game, 'w')
  const firstMove = calculateMove(game, 'w')

  move(game, firstMove)

  assertEquals(moves.includes(firstMove), true)
})
