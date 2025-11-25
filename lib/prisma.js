// lib/prisma.js - Alternate with logs
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis

const prisma =
  globalForPrisma.prisma || 
  new PrismaClient({
    log: ['error'], // Start with just 'error' or remove the whole block.
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma
