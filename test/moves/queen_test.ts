import { OccupiedSquare } from '../../src/types.ts'
import getPossibleMoves from '../../src/chess/moves/main.ts'
import startingBoard from '../../src/chess/board.ts'
import { checkMoves, updateBoard } from '../util.ts'

Deno.test('Queen', async (t) => {
  await t.step('Correct moves when in the middle of the board', async (t) => {
    await t.step('White', () => {
      const board = structuredClone(startingBoard)
      const queen: OccupiedSquare = { square: 'd4', type: 'q', color: 'w' }
      updateBoard(board, queen)

      const moves = getPossibleMoves(board, queen)

      checkMoves(moves, [
        'd4d3',
        'd4d5',
        'd4d6',
        'd4d7',
        'd4a4',
        'd4b4',
        'd4c4',
        'd4e4',
        'd4f4',
        'd4g4',
        'd4h4',
        'd4c3',
        'd4e3',
        'd4c5',
        'd4b6',
        'd4a7',
        'd4e5',
        'd4f6',
        'd4g7',
      ])
    })

    await t.step('Black', () => {
      const board = structuredClone(startingBoard)
      const queen: OccupiedSquare = { square: 'd4', type: 'q', color: 'b' }
      updateBoard(board, queen)

      const moves = getPossibleMoves(board, queen)

      checkMoves(moves, [
        'd4d2',
        'd4d3',
        'd4d5',
        'd4d6',
        'd4a4',
        'd4b4',
        'd4c4',
        'd4e4',
        'd4f4',
        'd4g4',
        'd4h4',
        'd4c3',
        'd4b2',
        'd4e3',
        'd4f2',
        'd4c5',
        'd4b6',
        'd4e5',
        'd4f6',
      ])
    })
  })
})
