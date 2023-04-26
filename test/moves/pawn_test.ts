import { assertEquals } from 'std/testing/asserts.ts'

import { OccupiedSquare } from '../../src/types.ts'
import getPossibleMoves from '../../src/chess/moves/main.ts'
import startingBoard from '../../src/chess/board.ts'
import { checkMoves, getEmptyBoard, updateBoard } from '../util.ts'
import { initializeGame, move, possibleMoves } from '../../src/chess/main.ts'

Deno.test('Pawn', async (t) => {
  await t.step('Initial move can be one or two steps', async (t) => {
    await t.step('White', () => {
      const pawn: OccupiedSquare = { square: 'e2', type: 'p', color: 'w' }
      const moves = getPossibleMoves(startingBoard, pawn)

      checkMoves(moves, ['e2e3', 'e2e4'])
    })

    await t.step('Black', () => {
      const pawn: OccupiedSquare = { square: 'e7', type: 'p', color: 'b' }
      const moves = getPossibleMoves(startingBoard, pawn)

      checkMoves(moves, ['e7e6', 'e7e5'])
    })
  })

  await t.step('Other moves are one step', async (t) => {
    await t.step('White', () => {
      const pawn: OccupiedSquare = { square: 'e4', type: 'p', color: 'w' }
      const moves = getPossibleMoves(startingBoard, pawn)

      checkMoves(moves, ['e4e5'])
    })

    await t.step('Black', () => {
      const pawn: OccupiedSquare = { square: 'e5', type: 'p', color: 'b' }
      const moves = getPossibleMoves(startingBoard, pawn)

      checkMoves(moves, ['e5e4'])
    })
  })

  await t.step('Can capture diagonally', async (t) => {
    const board = structuredClone(startingBoard)
    const whitePawn: OccupiedSquare = { square: 'd4', type: 'p', color: 'w' }
    const blackPawn: OccupiedSquare = { square: 'e5', type: 'p', color: 'b' }
    updateBoard(board, whitePawn)
    updateBoard(board, blackPawn)

    await t.step('White', () => {
      const moves = getPossibleMoves(board, whitePawn)

      checkMoves(moves, ['d4e5', 'd4d5'])
    })

    await t.step('Black', () => {
      const moves = getPossibleMoves(board, blackPawn)

      checkMoves(moves, ['e5d4', 'e5e4'])
    })
  })

  await t.step('Cannot move through pieces', async (t) => {
    const board = getEmptyBoard().reverse()
    const whitePawn: OccupiedSquare = { square: 'e4', type: 'p', color: 'w' }
    const blackPawn: OccupiedSquare = { square: 'e5', type: 'p', color: 'b' }
    updateBoard(board, whitePawn)
    updateBoard(board, blackPawn)

    await t.step('White', () => {
      const moves = getPossibleMoves(board, whitePawn)

      checkMoves(moves, [])
    })

    await t.step('Black', () => {
      const moves = getPossibleMoves(board, blackPawn)

      checkMoves(moves, [])
    })
  })

  await t.step('Can promote', async (t) => {
    const board = getEmptyBoard()
    const whitePawn: OccupiedSquare = { square: 'b7', type: 'p', color: 'w' }
    const blackPawn: OccupiedSquare = { square: 'b2', type: 'p', color: 'b' }
    updateBoard(board, whitePawn)
    updateBoard(board, blackPawn)

    await t.step('White', () => {
      const moves = getPossibleMoves(board, whitePawn)

      checkMoves(moves, ['b7b8q', 'b7b8r', 'b7b8b', 'b7b8n'])
    })

    await t.step('Black', () => {
      const moves = getPossibleMoves(board, blackPawn)

      checkMoves(moves, ['b2b1q', 'b2b1r', 'b2b1b', 'b2b1n'])
    })
  })

  await t.step('En passant', async (t) => {
    await t.step('White', () => {
      const game = initializeGame('test', ['e2e4', 'e7e6', 'e4e5', 'd7d5'])
      const moves = possibleMoves(game, 'w')

      assertEquals(moves.includes('e5d6'), true)

      const game2 = move(game, 'd2d3')
      const game3 = move(game2, 'f7f5')

      const moves2 = possibleMoves(game3, 'w')

      assertEquals(moves2.includes('e5f6'), true)
    })

    await t.step('Black', () => {
      const game = initializeGame('test', [
        'f2f4',
        'd7d5',
        'f4f5',
        'd5d4',
        'c2c4',
      ])
      const moves = possibleMoves(game, 'b')

      assertEquals(moves.includes('d4c3'), true)

      const game2 = move(game, 'e7e6')
      const game3 = move(game2, 'e2e4')

      const moves2 = possibleMoves(game3, 'b')

      assertEquals(moves2.includes('d4e3'), true)
    })
  })
})
