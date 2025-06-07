import bodyParser from 'body-parser'
import express, { type Express } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import routes from './routes'

export const createServer = (): Express => {
  const app = express()
  app
    .disable('e-tag')
    .disable('x-powered-by')
    .use(morgan('dev')) // TODO: remove
    .use(bodyParser.urlencoded({ extended: true }))
    .use(bodyParser.json())
    .use(cors())

  app.get('/status', (_, res) => {
    return res.json({ ok: true })
  })

  app.use('/api', routes)
  return app
}
