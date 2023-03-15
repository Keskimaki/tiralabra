import { Chess } from 'chess'

export const randomGame = () => {
  const chess = new Chess()

  while (!chess.isGameOver()) {
    const moves = chess.moves()
    const move = moves[Math.floor(Math.random() * moves.length)]
    chess.move(move)

    console.log(chess.ascii())
  }

  return chess
}
