import express, { type Express, json, urlencoded } from 'express'
import cors from 'cors'
import routes from '@/src/api/routes'
import { errorHandler } from '@/src/infrastructure/middleware/errorHandler'

export const createServer = (): Express => {
  const app = express()
  app
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors())

  app.use('/api', routes)
  app.use(errorHandler)
  return app
}
