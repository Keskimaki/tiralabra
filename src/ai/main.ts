import { Board, Color, Move, OccupiedSquare, Piece } from '../types.ts'
import { chess } from '../util/chess.ts'
import { piecePositions, pieceValues } from './tables.ts'
import minimax from './minimax.ts'

const getOccupiedSquares = (board: Board): OccupiedSquare[] =>
  board.flat().filter(Boolean) as OccupiedSquare[]

const getPieces = (pieceColor: string, squares: OccupiedSquare[]) =>
  squares.filter(({ color }) => color === pieceColor)

const getPieceValue = (
  color: Color,
  { type, square }: OccupiedSquare,
): number => {
  const pieceValue = pieceValues[type as Piece]

  const positions = color === 'w'
    ? piecePositions[type as Piece].map((row) => row.reverse()).reverse()
    : piecePositions[type as Piece]

  const [file, rank] = square.split('') as [string, string]
  const positionValue = positions[Number(rank) - 1][file.charCodeAt(0) - 97]

  const value = pieceValue + positionValue

  return value
}

const calculateValue = (color: Color, pieces: OccupiedSquare[]) => {
  const values = pieces.map((piece) => getPieceValue(color, piece))

  return values.reduce((acc: number, val: number) => acc + val, 0)
}

/** Evaluate the board based on the piece values and positions */
export const evaluateBoard = (board: Board, color: Color) => {
  const squares = getOccupiedSquares(board)

  const whitePieces = getPieces('w', squares)
  const blackPieces = getPieces('b', squares)

  const whiteValue = calculateValue('w', whitePieces)
  const blackValue = calculateValue('b', blackPieces)

  const score = color === 'w'
    ? whiteValue - blackValue
    : blackValue - whiteValue

  return score
}

const calculateMove = (color: Color): Move => {
  const { bestMove } = minimax(chess, 4, color)

  if (!bestMove) throw new Error('No move found')

  return bestMove
}

export default calculateMove
