import { PrismaClient } from '@prisma/client'

// Use globalThis to ensure the instance is shared across modules
const globalForPrisma = globalThis

let prisma

if (process.env.NODE_ENV === 'production') {
  // In production, instantiate a new client directly.
  prisma = new PrismaClient()
} else {
  // In development, use the global object to store a single instance.
  // This prevents multiple PrismaClients from being created during hot-reloading.
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient()
  }
  prisma = globalForPrisma.prisma
}

export default prisma
