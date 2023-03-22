import { Confirm, Input } from 'cliffy/prompt/mod.ts'

import { Move } from '../types.ts'
import { getPossibleMoves } from '../util/chess.ts'

const validateMove = (move: string): boolean | string => {
  const possibleMoves = getPossibleMoves()
  const isValid = possibleMoves.includes(move)

  return isValid || 'Invalid move'
}

export const getMove = async (): Promise<Move> => {
  const possibleMoves = getPossibleMoves()

  const move = await Input.prompt({
    message: 'What is your move?',
    list: true,
    suggestions: possibleMoves,
    validate: validateMove,
  })

  return move
}

export const waitForPlayer = async (): Promise<boolean> => {
  const confirm = await Confirm.prompt({
    message: 'Continue',
  })

  return confirm
}
