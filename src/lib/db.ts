import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'

if (!process.env.DATABASE_URL) {
    try {
        require('dotenv').config()
        if (!process.env.DATABASE_URL) {
            require('dotenv').config({ path: '.env.local' })
        }
    } catch (e) {
        // Ignore error if dotenv missing or not needed
    }
}

if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is not set')
}

const connectionString = `${process.env.DATABASE_URL}`

const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)

// @ts-ignore
export const prisma = new PrismaClient({ adapter })

export { PrismaClient }