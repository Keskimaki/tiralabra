import { Board, Color, Coordinate, Move, OccupiedSquare } from '../types.ts'

import {
  coordinatesToUciMove,
  isOccupied,
  isOtherColor,
  positionToCoordinate,
} from './util.ts'

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
    if (nx < 0 || nx > 7 || ny < 0 || ny > 7) continue

    const square = board[ny][nx]

    if (isOtherColor(square, color)) {
      moves.push([nx, ny])
    }
  }

  const [nx, ny] = [x, y + direction]

  if (nx < 0 || nx > 7 || ny < 0 || ny > 7) return []

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

  const directions = [
    [1, 2],
    [2, 1],
    [2, -1],
    [1, -2],
    [-1, -2],
    [-2, -1],
    [-2, 1],
    [-1, 2],
  ]

  for (const [dx, dy] of directions) {
    const [nx, ny] = [x + dx, y + dy]

    if (nx < 0 || nx > 7 || ny < 0 || ny > 7) continue

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

  const directions = [
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
  ]

  for (const [dx, dy] of directions) {
    let i = 1
    while (true) {
      const [nx, ny] = [x + dx * i, y + dy * i]

      if (nx < 0 || nx > 7 || ny < 0 || ny > 7) break

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

  const directions = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ]

  for (const [dx, dy] of directions) {
    let i = 1
    while (true) {
      const [nx, ny] = [x + dx * i, y + dy * i]

      if (nx < 0 || nx > 7 || ny < 0 || ny > 7) break

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

  const directions = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
  ]

  for (const [dx, dy] of directions) {
    const [nx, ny] = [x + dx, y + dy]

    if (nx < 0 || nx > 7 || ny < 0 || ny > 7) continue

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
 * Returns all possible moves for a given piece
 * @param board - the current board
 * @param piece - the piece to get the moves for
 * @returns an array of all possible moves
 * @todo add castling
 * @todo add en passant
 * @todo add promotion
 * @todo add check
 * @todo add checkmate
 * @todo add stalemate
 */
const getPossibleMoves = (board: Board, piece: OccupiedSquare): Move[] => {
  const { type, color, square } = piece

  const pos = positionToCoordinate(square)

  let moves: Coordinate[] = []

  switch (type) {
    case 'p':
      moves = pawnMoves(board, color, pos)
      break
    case 'n':
      moves = knightMoves(board, color, pos)
      break
    case 'b':
      moves = bishopMoves(board, color, pos)
      break
    case 'r':
      moves = rookMoves(board, color, pos)
      break
    case 'q':
      moves = [
        ...bishopMoves(board, color, pos),
        ...rookMoves(board, color, pos),
      ]
      break
    case 'k':
      moves = kingMoves(board, color, pos)
      break
  }

  return moves.map((move) => coordinatesToUciMove(pos, move))
}

export default getPossibleMoves
