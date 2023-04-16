import { OccupiedSquare } from '../../src/types.ts'
import getPossibleMoves from '../../src/chess/moves/main.ts'
import startingBoard from '../../src/chess/board.ts'
import { checkMoves, getEmptyBoard } from '../util.ts'

Deno.test('Pawn', async (t) => {
  await t.step('Initial move can be one or two steps', async (t) => {
    await t.step('White pawn', () => {
      const pawn: OccupiedSquare = { square: 'e2', type: 'p', color: 'w' }
      const moves = getPossibleMoves(startingBoard, pawn)
  
      checkMoves(moves, ['e2e3', 'e2e4'])
    })
  
    await t.step('Black pawn', () => {
      const pawn: OccupiedSquare = { square: 'e7', type: 'p', color: 'b' }
      const moves = getPossibleMoves(startingBoard, pawn)
  
      checkMoves(moves, ['e7e6', 'e7e5'])
    })
  })

  await t.step('Other moves are one step', async (t) => {
    await t.step('White pawn', () => {
      const pawn: OccupiedSquare = { square: 'e4', type: 'p', color: 'w' }
      const moves = getPossibleMoves(startingBoard, pawn)

      checkMoves(moves, ['e4e5'])
    })

    await t.step('Black pawn', () => {
      const pawn: OccupiedSquare = { square: 'e5', type: 'p', color: 'b' }
      const moves = getPossibleMoves(startingBoard, pawn)

      checkMoves(moves, ['e5e4'])
    })
  })

  await t.step('Can capture diagonally', async (t) => {
    const board = structuredClone(startingBoard)
    const whitePawn: OccupiedSquare = { square: 'd4', type: 'p', color: 'w' }
    const blackPawn: OccupiedSquare = { square: 'e5', type: 'p', color: 'b' }
    board[3][3] = whitePawn
    board[4][4] = blackPawn

    await t.step ('White pawn', () => {
      const moves = getPossibleMoves(board, whitePawn)

      checkMoves(moves, ['d4e5', 'd4d5'])
    })

    await t.step('Black pawn', () => {
      const moves = getPossibleMoves(board, blackPawn)

      checkMoves(moves, ['e5d4', 'e5e4'])
    })
  })

  await t.step('Can promote', async (t) => {
    const board = getEmptyBoard()
    const whitePawn: OccupiedSquare = { square: 'b7', type: 'p', color: 'w' }
    const blackPawn: OccupiedSquare = { square: 'b2', type: 'p', color: 'b' }
    board[1][6] = whitePawn
    board[1][1] = blackPawn

    await t.step('White pawn', () => {
      const moves = getPossibleMoves(board, whitePawn)

      checkMoves(moves, ['b7b8q', 'b7b8r', 'b7b8b', 'b7b8n'])
    })

    await t.step('Black pawn', () => {
      const moves = getPossibleMoves(board, blackPawn)

      checkMoves(moves, ['b2b1q', 'b2b1r', 'b2b1b', 'b2b1n'])
    })
  })

  // TODO: En passant
})