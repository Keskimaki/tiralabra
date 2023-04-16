import { assertEquals } from 'std/testing/asserts.ts'

import { Move, Board, OccupiedSquare } from '../src/types.ts'
import { positionToCoordinate } from '../src/chess/util.ts'

/** Check if two arrays have the same content */
export const sameContent = <T>(a: T[], b: T[]): boolean => {
  if (a.length !== b.length) return false

  return a.every((item) => b.includes(item))
}

/** Check that expected moves are returned in any order */
export const checkMoves = (a: Move[], b: Move[]) => assertEquals(sameContent(a, b), true)

export const getEmptyBoard = (): Board => [
  [{ square: 'a1' }, { square: 'b1' }, { square: 'c1' }, { square: 'd1' }, { square: 'e1' }, { square: 'f1' }, { square: 'g1' }, { square: 'h1' }],
  [{ square: 'a2' }, { square: 'b2' }, { square: 'c2' }, { square: 'd2' }, { square: 'e2' }, { square: 'f2' }, { square: 'g2' }, { square: 'h2' }],
  [{ square: 'a3' }, { square: 'b3' }, { square: 'c3' }, { square: 'd3' }, { square: 'e3' }, { square: 'f3' }, { square: 'g3' }, { square: 'h3' }],
  [{ square: 'a4' }, { square: 'b4' }, { square: 'c4' }, { square: 'd4' }, { square: 'e4' }, { square: 'f4' }, { square: 'g4' }, { square: 'h4' }],
  [{ square: 'a5' }, { square: 'b5' }, { square: 'c5' }, { square: 'd5' }, { square: 'e5' }, { square: 'f5' }, { square: 'g5' }, { square: 'h5' }],
  [{ square: 'a6' }, { square: 'b6' }, { square: 'c6' }, { square: 'd6' }, { square: 'e6' }, { square: 'f6' }, { square: 'g6' }, { square: 'h6' }],
  [{ square: 'a7' }, { square: 'b7' }, { square: 'c7' }, { square: 'd7' }, { square: 'e7' }, { square: 'f7' }, { square: 'g7' }, { square: 'h7' }],
  [{ square: 'a8' }, { square: 'b8' }, { square: 'c8' }, { square: 'd8' }, { square: 'e8' }, { square: 'f8' }, { square: 'g8' }, { square: 'h8' }],
]

/** Update the board with given piece */
export const updateBoard = (board: Board, piece: OccupiedSquare) => {
  const { square } = piece
  const [x, y] = positionToCoordinate(square)

  board[y][x] = piece
}
