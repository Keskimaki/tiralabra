import {
  Board,
  Color,
  Coordinate,
  Game,
  Move,
  OccupiedSquare,
  Piece,
  Position,
  Square,
} from '../types.ts'
import getPossibleMoves from './moves/main.ts'

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
  const [from, to, promotion] = uci.match(/.{1,2}/g) as [string, string, Piece?]

  const fromCoordinate = positionToCoordinate(from)
  let toCoordinate = positionToCoordinate(to)

  if (promotion) toCoordinate = [toCoordinate[0], toCoordinate[1], promotion]

  return [fromCoordinate, toCoordinate] as [Coordinate, Coordinate]
}

/*
 * Transform an array of two board coordinates to a UCI notation move
 * @param {array} from - Coordinate of the piece to move
 * @param {array} to - Coordinate of the destination square
 * @returns {string} - UCI notation of a move
 * @example
 * coordinatesToUciMove([4, 1], [4, 3]) // 'e2e4'
 * coordinatesToUciMove([4, 6], [4, 7], 'q') // 'e7e8q'
 */
export const coordinatesToUciMove = (
  from: Coordinate,
  to: Coordinate,
): Move => {
  const [fromFile, fromRank] = from
  const [toFile, toRank, promotion] = to

  const fromPosition = String.fromCharCode(fromFile + 97) + (fromRank + 1)
  const toPosition = String.fromCharCode(toFile + 97) + (toRank + 1)

  return fromPosition + toPosition + (promotion || '')
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

/*
 * Check if a square is threatened by the opponent
 * @param {array} board - Current board state
 * @param {string} square - Square to check
 * @param {string} color - Color of the player to check
 * @returns {boolean} - True if the square is threatened
 * @todo: Very inefficient, should be improved
 */
export const isThreatened = (
  board: Board,
  square: Position,
  color: Color,
) => {
  const pieces = getPieces(board, getOtherColor(color))

  for (const piece of pieces) {
    const moves = getPossibleMoves(board, piece)

    for (const move of moves) {
      const to = move.match(/.{1,2}/g)?.at(1)

      if (to === square) return true
    }
  }

  return false
}

/*
 * Get all possible en passant moves
 * @param {object} game - Current game state
 * @param {string} color - Color of the player to check
 * @returns {array} - List of en passant moves
 */
export const getEnPassantMoves = (game: Game, color: Color) => {
  const { moves, board } = game

  const lastMove = moves.at(-1)
  if (!lastMove) return []

  const [from, to] = uciMoveToCoordinates(lastMove)

  const isPawnMove = (board[to[1]][to[0]] as OccupiedSquare)?.type === 'p'
  const isTwoSquareMove = Math.abs(from[1] - to[1]) === 2

  if (!isPawnMove || !isTwoSquareMove) return []

  const [file, rank] = to

  const leftSquare = board[file - 1]?.[rank] as OccupiedSquare
  const rightSquare = board[file + 1]?.[rank] as OccupiedSquare

  const enPassantMoves = []

  const leftSquareIsPawn = leftSquare?.type === 'p' &&
    leftSquare?.color === color
  const rightSquareIsPawn = rightSquare?.type === 'p' &&
    rightSquare?.color === color

  if (color === 'w') {
    if (leftSquareIsPawn) {
      enPassantMoves.push(
        coordinatesToUciMove([file - 1, rank], [file, rank + 1]),
      )
    }

    if (rightSquareIsPawn) {
      enPassantMoves.push(
        coordinatesToUciMove([file + 1, rank], [file, rank + 1]),
      )
    }
  } else {
    if (leftSquareIsPawn) {
      enPassantMoves.push(
        coordinatesToUciMove([file - 1, rank], [file, rank - 1]),
      )
    }

    if (rightSquareIsPawn) {
      enPassantMoves.push(
        coordinatesToUciMove([file + 1, rank], [file, rank - 1]),
      )
    }
  }

  return enPassantMoves
}
