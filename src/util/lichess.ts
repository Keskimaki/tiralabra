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

const eventStream = async () => {
  const response = await fetch(`${baseUrl}/stream/event`, {
    headers,
  })

  if (!response.body) throw new Error('No response from Lichess')

  const stream = response.body.getReader()
  const decoder = new TextDecoder('utf-8')

  const events = []
  while (true) {
    const row = await stream.read()
    const text = decoder.decode(row.value)

    try {
      const obj = JSON.parse(text)
      events.push(obj)
    } catch {
      break
    }
  }

  return events
}

export const getGameState = async (gameId: string) => {
  const response = await fetch(`${baseUrl}/bot/game/stream/${gameId}`, {
    headers,
  })

  if (!response.body) throw new Error('No response from Lichess')

  const stream = response.body.getReader()
  const decoder = new TextDecoder('utf-8')

  // First row is the game state
  const row = await stream.read()
  const text = decoder.decode(row.value)
  const gameState = JSON.parse(text)

  return gameState
}

export const getCurrentGame = async () => {
  const events = await eventStream()
  const event = events.find(({ type }) => type === 'gameStart')

  if (!event) {
    console.log('No active game found')
    Deno.exit(0)
  }

  return event.game
}

export const getChallenge = async () => {
  const events = await eventStream()
  const { challenge } = events.find(({ type }) => type === 'challenge')

  return challenge
}
