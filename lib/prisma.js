// lib/prisma.js
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis

const prisma =
  globalForPrisma.prisma || 
  new PrismaClient() // <-- Crucially, remove the {} arguments

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma
