import { PrismaClient } from '../generated/prisma/client'

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set')
}

// Prisma 7 configuration
export const prisma = new PrismaClient({ accelerateUrl: process.env.DATABASE_URL })

export { PrismaClient }