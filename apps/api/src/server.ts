import express, { type Express, json, urlencoded } from 'express'
import cors from 'cors'
import routes from '@/src/routes'
import { errorHandler } from '@/src/middleware/errorHandler'

export const createServer = (): Express => {
  const app = express()
  app
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors())

  app.get('/status', (_, res) => {
    return res.json({ ok: true })
  })

  app.use('/api', routes)
  app.use(errorHandler)
  return app
}
