import { Request, Response, NextFunction } from 'express'
import { logger } from '@repo/logger'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction): void {
  logger.error(err.message, { stack: err.stack, path: req.path, method: req.method })

  if (!res.headersSent) {
    res.status(500).json({ message: 'Internal Server Error', error: err.message })
  }
}
