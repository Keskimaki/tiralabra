import { OccupiedSquare } from '../../src/types.ts'
import getPossibleMoves from '../../src/chess/moves/main.ts'
import startingBoard from '../../src/chess/board.ts'
import { checkMoves, updateBoard } from '../util.ts'

Deno.test('Rook', async (t) => {
  await t.step('Correct moves when in the middle of the board', async (t) => {
    await t.step('White', () => {
      const board = structuredClone(startingBoard)
      const rook: OccupiedSquare = { square: 'd4', type: 'r', color: 'w' }
      updateBoard(board, rook)
  
      const moves = getPossibleMoves(board, rook)
  
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
      ])
    })

    await t.step('Black', () => {
      const board = structuredClone(startingBoard)
      const rook: OccupiedSquare = { square: 'd4', type: 'r', color: 'b' }
      updateBoard(board, rook)
  
      const moves = getPossibleMoves(board, rook)
  
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
      ])
    })
  })
})
