import { PrismaClient } from '../generated/prisma/client'

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set')
}

export const prisma = new PrismaClient({
  datasources: {
    db: { url: process.env.DATABASE_URL }
  }
} as any)

export { PrismaClient }