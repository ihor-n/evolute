import { pino } from 'pino'

export const logger = pino({
  transport: process.stdout.isTTY ? { target: 'pino-pretty' } : undefined // No transport in production or non-TTY environments
})
