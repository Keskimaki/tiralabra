import { Chess } from 'chess'

import { Move } from '../types.ts'

const chess = new Chess()

export const move = (move: Move) => {
  chess.move(move, { strict: true })
}

export const undo = () => {
  chess.undo()
}

export const isGameOver = () => chess.isGameOver()

export const getBoard = () => chess.ascii()

export const getBoardState = () => chess.board()

export const getPossibleMoves = (): Move[] => chess.moves()

export const getRandomMove = (): Move => {
  const moves = getPossibleMoves()
  const randomIndex = Math.floor(Math.random() * moves.length)

  return moves[randomIndex]
}
