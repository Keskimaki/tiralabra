import { Move } from '../types.ts'

import { getRandomMove } from '../util/chess.ts'

const calculateMove = (): Move => getRandomMove()

export default calculateMove
