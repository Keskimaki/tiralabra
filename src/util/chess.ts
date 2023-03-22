import { Chess } from 'chess'

import { Board, Move } from '../types.ts'

export const chess = new Chess()

export const move = (move: Move) => {
  chess.move(move, { strict: true })
}

export const undo = () => {
  chess.undo()
}

export const isGameOver = (): boolean => chess.isGameOver()

export const getBoard = (): string => chess.ascii()

export const getBoardState = (): Board => chess.board()

export const getPossibleMoves = (): Move[] => chess.moves()

export const getRandomMove = (): Move => {
  const moves = getPossibleMoves()
  const randomIndex = Math.floor(Math.random() * moves.length)

  return moves[randomIndex]
}

export const lastMoveToUci = (): Move => {
  // TODO - get this working for promotion, castling, etc.
  const lastMove = chess.history({ verbose: true }).at(-1)
  const uci = lastMove.from + lastMove.to

  return uci
}
