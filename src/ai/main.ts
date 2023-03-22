import { Move, OccupiedSquare, Board, Piece } from '../types.ts'
import { getBoardState, getPossibleMoves, move, undo } from '../util/chess.ts'

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

const evaluateBoard = () => {
  // TODO remove hardcoded color
  const board = getBoardState()
  const squares = getOccupiedSquares(board)

  const whitePieces = getPieces('w', squares)
  const blackPieces = getPieces('b', squares)

  const whiteValue = calculateValue(whitePieces)
  const blackValue = calculateValue(blackPieces)

  return blackValue - whiteValue
}

const calculateMove = (): Move => {
  let bestScore = -Infinity
  let bestMove = null

  for (const possibleMove of getPossibleMoves()) {
    move(possibleMove)
    const score = evaluateBoard() // call minimax here
    undo()

    if (score > bestScore) {
      bestScore = score
      bestMove = possibleMove
    }
  }

  if (!bestMove) throw new Error('No move found')

  return bestMove
}

export default calculateMove
