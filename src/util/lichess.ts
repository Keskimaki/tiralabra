/**
 * @file functions to interact with the Lichess API
 * @link https://lichess.org/api#tag/Bot
 */

import { LICHESS_BOT_TOKEN } from './config.ts'
import { Move } from '../types.ts'

const baseUrl = 'https://lichess.org/api'

const headers = {
  Authorization: `Bearer ${LICHESS_BOT_TOKEN}`,
}

// Currently unused
/** Bot account status from Lichess */
export const getStatus = async () => {
  const response = await fetch(`${baseUrl}/account`, {
    headers,
  })

  return response.json()
}

/** Send next move to Lichess */
export const botMove = async (gameId: string, move: Move) => {
  console.log(move)
  const response = await fetch(`${baseUrl}/bot/game/${gameId}/move/${move}`, {
    method: 'POST',
    headers,
  })

  return response.json()
}

/** Open event stream to Lichess API and get all current events */
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

/** Continuous Lichess game stream */
export const gameStream = async (gameId: string) => {
  const response = await fetch(`${baseUrl}/bot/game/stream/${gameId}`, {
    headers,
  })

  if (!response.body) throw new Error('No response from Lichess')

  const stream = response.body.getReader()

  return stream
}

/** Filter current game from Lichess event stream */
export const getCurrentGame = async () => {
  const events = await eventStream()
  const event = events.find(({ type }) => type === 'gameStart')

  if (!event) {
    console.log('No active game found')
    Deno.exit(1)
  }

  return event.game
}

// Currently unused
// TODO: Automatically accept challenges
export const getChallenge = async () => {
  const events = await eventStream()
  const { challenge } = events.find(({ type }) => type === 'challenge')

  return challenge
}
