import {
  Board,
  Color,
  Coordinate,
  Move,
  OccupiedSquare,
  Square,
} from '../types.ts'

/*
 * Transform a board position to a coordinate
 * @param {string} position - Board position
 * @returns {array} - Coordinate
 * @example
 * positionToCoordinate('e4') // [4, 3]
 */
export const positionToCoordinate = (position: string): Coordinate => {
  const [file, rank] = position.split('') as [string, string]

  return [file.charCodeAt(0) - 97, +rank - 1]
}

/*
 * Transform a UCI notation move to an array of two board coordinates
 * @param {string} uci - UCI notation of a move
 * @returns {array} - Array of two coordinates
 * @example
 * uciMoveToCoordinates('e2e4') // [[4, 1], [4, 3]]
 */
export const uciMoveToCoordinates = (uci: Move): [Coordinate, Coordinate] => {
  const [from, to] = uci.match(/.{1,2}/g) as [string, string]

  const fromCoordinate = positionToCoordinate(from)
  const toCoordinate = positionToCoordinate(to)

  return [fromCoordinate, toCoordinate] as [Coordinate, Coordinate]
}

/*
 * Transform an array of two board coordinates to a UCI notation move
 * @param {array} from - Coordinate of the piece to move
 * @param {array} to - Coordinate of the destination square
 * @returns {string} - UCI notation of a move
 * @example
 * coordinatesToUciMove([4, 1], [4, 3]) // 'e2e4'
 */
export const coordinatesToUciMove = (
  from: Coordinate,
  to: Coordinate,
): Move => {
  const [fromFile, fromRank] = from
  const [toFile, toRank] = to

  const fromPosition = String.fromCharCode(fromFile + 97) + (fromRank + 1)
  const toPosition = String.fromCharCode(toFile + 97) + (toRank + 1)

  return fromPosition + toPosition
}

export const isOccupied = (square: Square): square is OccupiedSquare =>
  (square as OccupiedSquare)?.type !== undefined

/*
 * Get all pieces of a given color
 * @param {array} board - Current board state
 * @param {string} color - Color of pieces to get
 * @returns {array} - List of pieces
 */
export const getPieces = (board: Board, color: Color): OccupiedSquare[] => {
  const pieces = board.flat().filter(isOccupied)

  return pieces.filter((piece) => piece.color === color)
}

export const isOtherColor = (square: Square, color: Color) =>
  isOccupied(square) && square.color !== color

export const getOtherColor = (color: Color) => color === 'w' ? 'b' : 'w'

export const isInvalidCoordinate = (coordinate: Coordinate) =>
  coordinate[0] < 0 || coordinate[0] > 7 || coordinate[1] < 0 ||
  coordinate[1] > 7
