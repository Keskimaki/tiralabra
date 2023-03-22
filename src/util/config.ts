import { load } from 'std/dotenv/mod.ts'

const env = await load()

export const PORT = Number(env.PORT) || 3000

export const LICHESS_BOT_TOKEN = env.LICHESS_BOT_TOKEN
