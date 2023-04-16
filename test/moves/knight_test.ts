import { OccupiedSquare } from '../../src/types.ts'
import getPossibleMoves from '../../src/chess/moves/main.ts'
import startingBoard from '../../src/chess/board.ts'
import { checkMoves, getEmptyBoard, updateBoard } from '../util.ts'

Deno.test('Knight', async (t) => {
  await t.step('Correct moves at d5', async (t) => {
    await t.step('White', () => {
      const board = structuredClone(startingBoard)
      const knight: OccupiedSquare = { square: 'd5', type: 'n', color: 'w' }
      updateBoard(board, knight)

      const moves = getPossibleMoves(board, knight)

      checkMoves(moves, [
        'd5c3',
        'd5e3',
        'd5b4',
        'd5f4',
        'd5b6',
        'd5f6',
        'd5c7',
        'd5e7',
      ])
    })

    await t.step('Black', () => {
      const board = structuredClone(startingBoard)
      const knight: OccupiedSquare = { square: 'd5', type: 'n', color: 'b' }
      updateBoard(board, knight)

      const moves = getPossibleMoves(board, knight)

      checkMoves(moves, [
        'd5c3',
        'd5e3',
        'd5b4',
        'd5f4',
        'd5b6',
        'd5f6',
      ])
    })
  })

  await t.step('Correct moves at a1', async (t) => {
    await t.step('White', () => {
      const board = getEmptyBoard()
      const knight: OccupiedSquare = { square: 'a1', type: 'n', color: 'w' }
      updateBoard(board, knight)

      const moves = getPossibleMoves(board, knight)

      checkMoves(moves, ['a1b3', 'a1c2'])
    })

    await t.step('Black', () => {
      const board = getEmptyBoard()
      const knight: OccupiedSquare = { square: 'a1', type: 'n', color: 'b' }
      updateBoard(board, knight)

      const moves = getPossibleMoves(board, knight)

      checkMoves(moves, ['a1b3', 'a1c2'])
    })
  })
})
