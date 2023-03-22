import { Chess } from 'chess'

import { Board, Move, Piece } from '../types.ts'

export const chess = new Chess()

export const move = (move: Move) => {
  chess.move(move, { strict: false })
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
  const lastMove = chess.history({ verbose: true }).at(-1)
  if (!lastMove) return ''

  const uci = lastMove.from + lastMove.to + (lastMove.promotion || '')

  return uci
}

export const UciToAn = (uci: Move): Move => {
  type Uci = [string, string, string | undefined]

  const [from, to, promotion] = uci.match(/.{1,2}/g) as Uci
  const piece: Piece = chess.get(from).type

  return `${piece}${from}${to}${promotion || ''}`
}
