import 'dotenv/config'
import mongoose from 'mongoose'
import connectDB from '../config/db'
import { logger } from '@repo/logger'

const createIndexes = async () => {
  try {
    await connectDB()
    logger.info('Connected to MongoDB to create indexes.')

    const db = mongoose.connection.db

    if (!db) {
      logger.error('Database connection is not available to create indexes.')
      process.exit(1)
    }

    // Indexes for fields used in engagement score calculation
    await db.collection('users').createIndex({ lastActive: 1 })
    logger.info('Index created for users: lastActive')
    await db.collection('users').createIndex({ 'participation.responseRate': 1 })
    logger.info('Index created for users: participation.responseRate')
    await db.collection('users').createIndex({ 'participation.surveysInvited': 1 })
    logger.info('Index created for users: participation.surveysInvited')
    await db.collection('users').createIndex({ 'participation.surveysCompleted': 1 })
    logger.info('Index created for users: participation.surveysCompleted')
    await db.collection('users').createIndex({ 'participation.responseQuality.thoughtfulnessScore': 1 })
    logger.info('Index created for users: participation.responseQuality.thoughtfulnessScore')

    // Compound index for demographic grouping in the statistics pipeline
    await db.collection('users').createIndex({
      'demographics.ageRange': 1,
      'demographics.gender': 1,
      'demographics.education': 1
    })
    logger.info('Compound index created for users: demographics')

    await db.collection('users').createIndex({ status: 1 })
    logger.info('Index created for users: status')

    logger.info('All specified indexes have been ensured.')
  } catch (error) {
    logger.error('Error creating indexes:', error)
  } finally {
    await mongoose.connection.close()
    logger.info('MongoDB connection closed.')
    process.exit(0)
  }
}

createIndexes()
