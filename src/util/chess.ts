/**
  * @file Game logic related utility functions based on chess.js library
  * @todo get rid of chess.js and switch to using only UCI notation
*/

import { Chess, Square } from 'chess'

import { Move, Piece } from '../types.ts'

export const chess = new Chess()

export const reset = () => {
  chess.reset()
}

export const move = (move: Move) => {
  chess.move(move, { strict: false })
}

export const undo = () => {
  chess.undo()
}

export const isGameOver = (): boolean => chess.isGameOver()

export const getBoard = (): string => chess.ascii()

export const lastMoveToUci = (): Move => {
  const lastMove = chess.history({ verbose: true }).at(-1)
  if (!lastMove) return ''

  const uci = lastMove.from + lastMove.to + (lastMove.promotion || '')

  return uci
}

// Lichess uses UCI notation, but the chess.js library uses AN notation
export const UciToAn = (uci: Move): Move => {
  type Uci = [Square, Square, Piece | undefined]

  const [from, to, promotion] = uci.match(/.{1,2}/g) as Uci
  const piece: Piece = chess.get(from).type

  return `${piece}${from}${to}${promotion || ''}`
}
