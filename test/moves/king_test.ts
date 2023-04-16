import { OccupiedSquare } from '../../src/types.ts'
import getPossibleMoves from '../../src/chess/moves/main.ts'
import startingBoard from '../../src/chess/board.ts'
import { checkMoves, getEmptyBoard, updateBoard } from '../util.ts'

Deno.test('King', async (t) => {
  await t.step('Can move one square in any direction', async (t) => {
    await t.step('White', () => {
      const board = getEmptyBoard()
      const king: OccupiedSquare = { square: 'd4', type: 'k', color: 'w' }
      updateBoard(board, king)

      const moves = getPossibleMoves(board, king)

      checkMoves(moves, [
        'd4c3',
        'd4d3',
        'd4e3',
        'd4c4',
        'd4e4',
        'd4c5',
        'd4d5',
        'd4e5',
      ])
    })

    await t.step('Black', () => {
      const board = getEmptyBoard()
      const king: OccupiedSquare = { square: 'd4', type: 'k', color: 'b' }
      updateBoard(board, king)

      const moves = getPossibleMoves(board, king)

      checkMoves(moves, [
        'd4c3',
        'd4d3',
        'd4e3',
        'd4c4',
        'd4e4',
        'd4c5',
        'd4d5',
        'd4e5',
      ])
    })
  })

  await t.step('Blocked by own pieces', async (t) => {
    const board = structuredClone(startingBoard)

    await t.step('White', () => {
      const king: OccupiedSquare = { square: 'd1', type: 'k', color: 'w' }
      updateBoard(board, king)

      const moves = getPossibleMoves(board, king)

      checkMoves(moves, [])
    })

    await t.step('Black', () => {
      const king: OccupiedSquare = { square: 'e8', type: 'k', color: 'b' }
      updateBoard(board, king)

      const moves = getPossibleMoves(board, king)

      checkMoves(moves, [])
    })
  })

  await t.step('Can capture enemy pieces', async (t) => {
    await t.step('White', () => {
      const board = getEmptyBoard()
      const king: OccupiedSquare = { square: 'd4', type: 'k', color: 'w' }
      const enemy: OccupiedSquare = { square: 'd5', type: 'p', color: 'b' }
      updateBoard(board, king)
      updateBoard(board, enemy)

      const moves = getPossibleMoves(board, king)

      checkMoves(moves, [
        'd4c3',
        'd4d3',
        'd4e3',
        'd4c4',
        'd4e4',
        'd4c5',
        'd4d5',
        'd4e5',
      ])
    })

    await t.step('Black', () => {
      const board = getEmptyBoard()
      const king: OccupiedSquare = { square: 'd4', type: 'k', color: 'b' }
      const enemy: OccupiedSquare = { square: 'd3', type: 'p', color: 'w' }
      updateBoard(board, king)
      updateBoard(board, enemy)

      const moves = getPossibleMoves(board, king)

      checkMoves(moves, [
        'd4c3',
        'd4d3',
        'd4e3',
        'd4c4',
        'd4e4',
        'd4c5',
        'd4d5',
        'd4e5',
      ])
    })
  })
})
