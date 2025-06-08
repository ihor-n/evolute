import mongoose from 'mongoose'
import { logger } from '@repo/logger'

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      logger.error('MONGODB_URI is not defined in environment variables.')
      process.exit(1)
    }
    await mongoose.connect(process.env.MONGODB_URI)
    logger.info('MongoDB Connected...')
  } catch (err) {
    logger.error(`MongoDB connection error: ${(err as Error).message}`)
    process.exit(1)
  }
}

export default connectDB
