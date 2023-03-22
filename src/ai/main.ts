import { Board, Color, Move, OccupiedSquare, Piece } from '../types.ts'
import { chess } from '../util/chess.ts'
import minimax from './minimax.ts'

const pieceValues = {
  p: 1,
  n: 3,
  b: 3,
  r: 5,
  q: 9,
  k: 100,
}

const getOccupiedSquares = (board: Board): OccupiedSquare[] =>
  board.flat().filter(Boolean) as OccupiedSquare[]

const getPieces = (pieceColor: string, squares: OccupiedSquare[]) =>
  squares.filter(({ color }) => color === pieceColor).map(({ type }) => type)

const calculateValue = (pieces: Piece[]) => {
  const values = pieces.map((piece) => pieceValues[piece])

  return values.reduce((acc: number, val: number) => acc + val, 0)
}

export const evaluateBoard = (board: Board, color: Color) => {
  const squares = getOccupiedSquares(board)

  const whitePieces = getPieces('w', squares)
  const blackPieces = getPieces('b', squares)

  const whiteValue = calculateValue(whitePieces)
  const blackValue = calculateValue(blackPieces)

  const score = color === 'w'
    ? whiteValue - blackValue
    : blackValue - whiteValue

  return score
}

const calculateMove = (color: Color): Move => {
  const { bestMove } = minimax(chess, 3, true, color)

  if (!bestMove) throw new Error('No move found')

  return bestMove
}

export default calculateMove
