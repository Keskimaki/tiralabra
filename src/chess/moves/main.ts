import { Board, Coordinate, Move, OccupiedSquare } from '../../types.ts'
import { coordinatesToUciMove, positionToCoordinate } from '../util.ts'
import {
  bishopMoves,
  kingMoves,
  knightMoves,
  pawnMoves,
  rookMoves,
} from './pieces.ts'

const pieceMoves = (
  board: Board,
  piece: OccupiedSquare,
  pos: Coordinate,
): Coordinate[] => {
  const { type, color } = piece

  switch (type) {
    case 'p':
      return pawnMoves(board, color, pos)
    case 'n':
      return knightMoves(board, color, pos)
    case 'b':
      return bishopMoves(board, color, pos)
    case 'r':
      return rookMoves(board, color, pos)
    case 'q':
      return [
        ...bishopMoves(board, color, pos),
        ...rookMoves(board, color, pos),
      ]
    case 'k':
      return kingMoves(board, color, pos)
  }
}

/*
 * Returns all possible moves for a given piece
 * @param board - the current board
 * @param piece - the piece to get the moves for
 * @returns an array of all possible moves
 */
const getPossibleMoves = (board: Board, piece: OccupiedSquare): Move[] => {
  const pos = positionToCoordinate(piece.square)

  const moves = pieceMoves(board, piece, pos)

  return moves.map((move) => coordinatesToUciMove(pos, move))
}

export default getPossibleMoves
