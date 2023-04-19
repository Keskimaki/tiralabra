import { assertEquals } from 'std/testing/asserts.ts'

import { Move } from '../../src/types.ts'
import getCastlingMoves from '../../src/chess/moves/castle.ts'
import { initializeGame, move } from '../../src/chess/main.ts'
import { checkMoves } from '../util.ts'
import { positionToCoordinate } from '../../src/chess/util.ts'

Deno.test('Castling', async (t) => {
  await t.step('Is possible', async (t) => {
    const moves: Move[] = ['e2e4', 'e7e5', 'f1d3', 'f8d6', 'g1f3', 'g8f6']
    const game = initializeGame('test', moves)

    await t.step('White', () => {
      const moves = getCastlingMoves(game.board, 'w')
      checkMoves(moves, ['e1g1'])
    })

    await t.step('Black', () => {
      const moves = getCastlingMoves(game.board, 'b')
      checkMoves(moves, ['e8g8'])
    })

    await t.step('Board is updated correctly', () => {
      const { board } = move(game, 'e1g1')

      const [x, y] = positionToCoordinate('g1')
      const [x2, y2] = positionToCoordinate('f1')

      const g1 = board[y][x]
      const f1 = board[y2][x2]

      assertEquals(g1, { square: 'g1', type: 'k', color: 'w' })
      assertEquals(f1, { square: 'f1', type: 'r', color: 'w' })
    })
  })

  await t.step('Not always allowed', () => {
    const game = initializeGame('test', ['e2e4', 'e7e5', 'f1d3', 'f8d6'])

    const moves = getCastlingMoves(game.board, 'w')
    checkMoves(moves, [])
  })
})
