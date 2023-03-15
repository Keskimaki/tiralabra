import { Input } from 'cliffy/prompt/mod.ts'

import { Move } from '../types.ts'

export const getMove = async (): Promise<Move> => {
  const move = await Input.prompt({
    message: 'What is your move?',
    minLength: 2,
  })

  return move
}
