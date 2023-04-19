import { Board, Color, Coordinate, Piece } from '../../types.ts'
import { isInvalidCoordinate, isOccupied, isOtherColor } from '../util.ts'
import pieceDirections from './directions.ts'

const promotions: Piece[] = ['q', 'r', 'b', 'n']

export const pawnMoves = (
  board: Board,
  color: Color,
  [x, y]: Coordinate,
): Coordinate[] => {
  const moves: Coordinate[] = []

  const direction = color === 'w' ? 1 : -1

  const right = [x + 1, y + direction]
  const left = [x - 1, y + direction]

  // Check for captures
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

  // Check for promotion
  if (y === (color === 'w' ? 6 : 1)) {
    for (const promotion of promotions) {
      moves.push([nx, ny, promotion])
    }
  } else {
    // Move forward
    moves.push([nx, ny])
  }

  // Initial two step move
  if (y === (color === 'w' ? 1 : 6)) {
    const [nx, ny] = [x, y + direction * 2]

    const square = board[ny][nx]

    if (isOccupied(square)) return moves

    moves.push([nx, ny])
  }

  return moves
}

export const knightMoves = (
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

export const bishopMoves = (
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

export const rookMoves = (
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

export const kingMoves = (
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
