// lib/prisma.js
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis

const prisma =
  globalForPrisma.prisma || 
  new PrismaClient() // MUST be a simple constructor, no arguments.

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma
