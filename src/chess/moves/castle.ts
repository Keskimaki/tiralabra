import { Board, Color, Move, Position } from '../../types.ts'
import {
  getPieces,
  isOccupied,
  isThreatened,
  positionToCoordinate,
} from '../util.ts'

export const castlingRookMoves: { [n: Move]: Move } = {
  'e1g1': 'h1f1',
  'e1c1': 'a1d1',
  'e8g8': 'h8f8',
  'e8c8': 'a8d8',
}

/*
 * Get all possible castling moves
 * Previous moves are not currently checked, so it is possible to get invalid moves
 * @param {array} board - Current board state
 * @param {string} color - Color of the player to check
 * @returns {array} - List of castling moves
 */
const getCastlingMoves = (
  board: Board,
  color: Color,
): Move[] => {
  const moves: Move[] = []

  const pieces = getPieces(board, color)
  const king = pieces.find((piece) => piece.type === 'k')
  const rooks = pieces.filter((piece) => piece.type === 'r')

  if (!king || rooks.length < 2) return moves

  const kingPosition = color === 'w' ? 'e1' : 'e8'
  const rookPositions = color === 'w' ? ['a1', 'h1'] : ['a8', 'h8']

  const kingMoved = king.square !== kingPosition
  const rooksMoved = rooks.every((rook) => !rookPositions.includes(rook.square))

  if (kingMoved || rooksMoved) return moves

  if (isThreatened(board, kingPosition, color)) return moves

  const kingSideSquares: Position[] = color === 'w'
    ? ['f1', 'g1']
    : ['f8', 'g8']
  const queenSideSquares: Position[] = color === 'w'
    ? ['b1', 'c1', 'd1']
    : ['b8', 'c8', 'd8']

  const kingSideEmpty = kingSideSquares.every(
    (square) => {
      const [file, rank] = positionToCoordinate(square)
      return !isOccupied(board[rank][file])
    },
  )
  const queenSideEmpty = queenSideSquares.every(
    (square) => {
      const [file, rank] = positionToCoordinate(square)
      return !isOccupied(board[rank][file])
    },
  )

  const kingSideThreatened = kingSideSquares.some(
    (square) => isThreatened(board, square, color),
  )
  const queenSideThreatened = queenSideSquares.some(
    (square) => isThreatened(board, square, color),
  )

  if (kingSideEmpty && !kingSideThreatened) {
    moves.push(color === 'w' ? 'e1g1' : 'e8g8')
  }
  if (queenSideEmpty && !queenSideThreatened) {
    moves.push(color === 'w' ? 'e1c1' : 'e8c8')
  }

  return moves
}

export default getCastlingMoves
