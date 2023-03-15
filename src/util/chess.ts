import { Chess } from 'chess'

import { Move } from '../types.ts'

const chess = new Chess()

export const move = (move: Move) => {
   chess.move(move, { strict: true })
}

export const isGameOver = () => chess.isGameOver()

export const getBoard = () => chess.ascii()
