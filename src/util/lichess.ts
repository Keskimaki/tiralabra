import { LICHESS_BOT_TOKEN } from './config.ts'
import { lastMoveToUci } from './chess.ts'

const baseUrl = 'https://lichess.org/api'

const headers = {
  Authorization: `Bearer ${LICHESS_BOT_TOKEN}`,
}

export const getStatus = async () => {
  const response = await fetch(`${baseUrl}/account`, {
    headers,
  })

  return response.json()
}

export const botMove = async (gameId: string) => {
  const move = lastMoveToUci()

  const response = await fetch(`${baseUrl}/bot/game/${gameId}/move/${move}`, {
    method: 'POST',
    headers,
  })

  return response.json()
}
