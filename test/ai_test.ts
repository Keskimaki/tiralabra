import { assertEquals } from 'std/testing/asserts.ts'

import calculateMove, { evaluateBoard } from '../src/ai/main.ts'
import minimax from '../src/ai/minimax.ts'
import { initializeGame, move, possibleMoves } from '../src/chess/main.ts'
import startingBoard from '../src/chess/board.ts'
import { getEmptyBoard, updateBoard } from './util.ts'
import { Game, Move, OccupiedSquare } from '../src/types.ts'

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

Deno.test('Minimax', async (t) => {
  await t.step('Returns a valid move', () => {
    const game = initializeGame('test')

    const moves = possibleMoves(game, 'w')
    const firstMove = calculateMove(game, 'w')

    move(game, firstMove)

    assertEquals(moves.includes(firstMove), true)
  })

  await t.step('Winning move is found', () => {
    const moves = ['f2f4', 'e7e6', 'g2g4']
    const game = initializeGame('test', moves)

    const move = calculateMove(game, 'b')

    assertEquals(move, 'd8h4')
  })

  await t.step('Captures when advantageous', () => {
    const moves = ['c2c3', 'c7c6', 'b2b4', 'd8a5']
    const game = initializeGame('test', moves)

    const move = calculateMove(game, 'w')

    assertEquals(move, 'b4a5')
  })

  await t.step('Trades for a more valuable piece', () => {
    const moves = ['g1f3', 'd7d6', 'f3e5', 'd5d4', 'e5c6', 'd4d3']
    const game = initializeGame('test', moves)

    const move = calculateMove(game, 'w')
    assertEquals(move, 'c6d8')
  })

  await t.step('Finds a multi move mate', () => {
    const board = getEmptyBoard()

    const blackKing: OccupiedSquare = { square: 'a8', type: 'k', color: 'b' }
    const whiteKing: OccupiedSquare = { square: 'g1', type: 'k', color: 'w' }

    const rookOne: OccupiedSquare = { square: 'd5', type: 'r', color: 'w' }
    const rookTwo: OccupiedSquare = { square: 'f4', type: 'r', color: 'w' }

    const pieces = [blackKing, whiteKing, rookOne, rookTwo]

    for (const piece of pieces) updateBoard(board, piece)

    const correctMoves = ['f4f7', 'd5d8']

    let game: Game = { gameId: 'test', board, moves: [] }
    for (let i = 0; i < 2; i++) {
      const { bestMove: whiteMove } = minimax(
        game,
        4,
        'w',
        -Infinity,
        Infinity,
        true,
        true,
      )

      game = move(game, whiteMove as Move)

      assertEquals(whiteMove, correctMoves[i])

      game = move(game, 'a8b8') // Only legal move
    }
  })
})
