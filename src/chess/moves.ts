import { Board, Color, Coordinate, Move, OccupiedSquare } from '../types.ts'

import {
  coordinatesToUciMove,
  isInvalidCoordinate,
  isOccupied,
  isOtherColor,
  positionToCoordinate,
} from './util.ts'

const pieceDirections = {
  n: [
    [1, 2],
    [2, 1],
    [2, -1],
    [1, -2],
    [-1, -2],
    [-2, -1],
    [-2, 1],
    [-1, 2],
  ],
  b: [
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
  ],
  r: [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ],
  k: [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
  ],
}

const pawnMoves = (
  board: Board,
  color: Color,
  [x, y]: Coordinate,
): Coordinate[] => {
  const moves: Coordinate[] = []

  const direction = color === 'w' ? 1 : -1

  const right = [x + 1, y + direction]
  const left = [x - 1, y + direction]

  for (const [nx, ny] of [right, left]) {
    if (isInvalidCoordinate([nx, ny])) continue

    const square = board[ny][nx]

    if (isOtherColor(square, color)) {
      moves.push([nx, ny])
    }
  }

  const [nx, ny] = [x, y + direction]

  if (isInvalidCoordinate([nx, ny])) return moves

  const square = board[ny][nx]

  if (isOccupied(square)) return moves

  moves.push([nx, ny])

  if (y === (color === 'w' ? 1 : 6)) {
    const [nx, ny] = [x, y + direction * 2]

    const square = board[ny][nx]

    if (isOccupied(square)) return moves

    moves.push([nx, ny])
  }

  return moves
}

const knightMoves = (
  board: Board,
  color: Color,
  [x, y]: Coordinate,
): Coordinate[] => {
  const moves: Coordinate[] = []

  const directions = pieceDirections.n

  for (const [dx, dy] of directions) {
    const [nx, ny] = [x + dx, y + dy]

    if (isInvalidCoordinate([nx, ny])) continue

    const square = board[ny][nx]

    if (isOccupied(square)) {
      if (isOtherColor(square, color)) {
        moves.push([nx, ny])
      }
      continue
    }

    moves.push([nx, ny])
  }

  return moves
}

const bishopMoves = (
  board: Board,
  color: Color,
  [x, y]: Coordinate,
): Coordinate[] => {
  const moves: Coordinate[] = []

  const directions = pieceDirections.b

  for (const [dx, dy] of directions) {
    let i = 1
    while (true) {
      const [nx, ny] = [x + dx * i, y + dy * i]

      if (isInvalidCoordinate([nx, ny])) break

      const square = board[ny][nx]

      if (isOccupied(square)) {
        if (isOtherColor(square, color)) {
          moves.push([nx, ny])
        }
        break
      }

      moves.push([nx, ny])

      i++
    }
  }

  return moves
}

const rookMoves = (
  board: Board,
  color: Color,
  [x, y]: Coordinate,
): Coordinate[] => {
  const moves: Coordinate[] = []

  const directions = pieceDirections.r

  for (const [dx, dy] of directions) {
    let i = 1
    while (true) {
      const [nx, ny] = [x + dx * i, y + dy * i]

      if (isInvalidCoordinate([nx, ny])) break

      const square = board[ny][nx]

      if (isOccupied(square)) {
        if (isOtherColor(square, color)) {
          moves.push([nx, ny])
        }
        break
      }

      moves.push([nx, ny])

      i++
    }
  }

  return moves
}

const kingMoves = (
  board: Board,
  color: Color,
  [x, y]: Coordinate,
): Coordinate[] => {
  const moves: Coordinate[] = []

  const directions = pieceDirections.k

  for (const [dx, dy] of directions) {
    const [nx, ny] = [x + dx, y + dy]

    if (isInvalidCoordinate([nx, ny])) continue

    const square = board[ny][nx]

    if (isOccupied(square)) {
      if (isOtherColor(square, color)) {
        moves.push([nx, ny])
      }
      continue
    }

    moves.push([nx, ny])
  }

  return moves
}

/*
 * @todo castling
 * @todo en passant
 * @todo promotion
 * @todo check
 * @todo checkmate
 * @todo stalemate
 */
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
