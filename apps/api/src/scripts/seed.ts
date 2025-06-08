import 'dotenv/config'

import mongoose from 'mongoose'
import { logger } from '@repo/logger'
import { connectDB } from '@/src/infrastructure/config/db'
import User from '@/src/core/models/User'
import Manufacturer from '@/src/core/models/Manufacturer'
import { sampleUsers, sampleManufacturers } from '@/src/scripts/sample-data'

const seedDatabase = async () => {
  try {
    await connectDB()

    await User.deleteMany({})
    logger.info('Users cleared')
    await Manufacturer.deleteMany({})
    logger.info('Manufacturers cleared')

    await User.insertMany(sampleUsers)
    logger.info('Sample users inserted')

    await Manufacturer.insertMany(sampleManufacturers)
    logger.info('Sample manufacturers inserted')

    logger.info('Database seeded successfully!')
  } catch (error) {
    logger.error('Error seeding database:', error)
  } finally {
    await mongoose.connection.close()
    logger.info('MongoDB connection closed')
    process.exit(0)
  }
}

seedDatabase()
