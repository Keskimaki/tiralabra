// deno-lint-ignore-file no-explicit-any
import { Move } from '../types.ts'
import { getBoardState, getPossibleMoves, move, undo } from '../util/chess.ts'

const pieceValues = {
  p: 1,
  n: 3,
  b: 3,
  r: 5,
  q: 9,
  k: 100,
}

const evaluateBoard = () => {
  // Quick and dirty evaluation function
  // Simply counts the value of own pieces on the board
  // TODO: Rewrite properly, take opponents pieces and piece positions into account
  const board = getBoardState()

  const pieces = board.flat().filter(Boolean)
  const aiPieces = pieces.filter((piece: any) => piece.color === 'b').map((
    piece: any,
  ) => piece.type)

  const values = aiPieces.map((piece: keyof typeof pieceValues) => pieceValues[piece])

  const value = values.reduce((acc: number, val: number) => acc + val, 0)

  return value
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
