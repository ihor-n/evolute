import 'dotenv/config'
import 'reflect-metadata'
import { logger } from '@repo/logger'
import { createServer } from '@/src/server'
import { connectDB } from '@/src/infrastructure/config/db'

const port = process.env.PORT || 5001
const server = createServer()

connectDB().then(() => {
  server.listen(port, () => {
    logger.info(`api running on ${port}`)
  })
})
