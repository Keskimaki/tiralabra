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

Deno.test('Winning move is found', () => {
  const moves = ['f2f4', 'e7e6', 'g2g4']
  const game = initializeGame('test', moves)

  const move = calculateMove(game, 'b')

  assertEquals(move, 'd8h4')
})

Deno.test('Captures when advantageous', () => {
  const moves = ['c2c3', 'c7c6', 'b2b4', 'd8a5']
  const game = initializeGame('test', moves)

  const move = calculateMove(game, 'w')

  assertEquals(move, 'b4a5')
})

Deno.test('Trades for a more valuable piece', () => {
  const moves = ['g1f3', 'd7d6','f3e5', 'd5d4', 'e5c6', 'd4d3']
  const game = initializeGame('test', moves)

  const move = calculateMove(game, 'w')
  assertEquals(move, 'c6d8')
})
