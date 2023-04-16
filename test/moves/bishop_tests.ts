import { OccupiedSquare } from '../../src/types.ts'
import getPossibleMoves from '../../src/chess/moves/main.ts'
import startingBoard from '../../src/chess/board.ts'
import { checkMoves, updateBoard } from '../util.ts'

Deno.test('Bishop', async (t) => {
  await t.step('Correct moves when in the middle of the board', async (t) => {
    await t.step('White', () => {
      const board = structuredClone(startingBoard)
      const bishop: OccupiedSquare = { square: 'd4', type: 'b', color: 'w' }
      updateBoard(board, bishop)

      const moves = getPossibleMoves(board, bishop)

      checkMoves(moves, [
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
      const bishop: OccupiedSquare = { square: 'd4', type: 'b', color: 'b' }
      updateBoard(board, bishop)

      const moves = getPossibleMoves(board, bishop)

      checkMoves(moves, [
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
