import 'dotenv/config'
import { logger } from '@repo/logger'
import { createServer } from '@/src/server'
import connectDB from '@/src/config/db'

const port = process.env.PORT || 5001
const server = createServer()

connectDB().then(() => {
  server.listen(port, () => {
    logger.info(`api running on ${port}`)
  })
})
