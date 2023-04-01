import { load } from 'std/dotenv/mod.ts'

const env = await load()

export const LICHESS_BOT_TOKEN = env.LICHESS_BOT_TOKEN

if (!LICHESS_BOT_TOKEN) {
  throw new Error('LICHESS_BOT_TOKEN not found in .env file')
}
