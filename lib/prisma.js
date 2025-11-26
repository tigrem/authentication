import { PrismaClient } from '@prisma/client'

// Use the explicit 'global' object reference for Node.js environments
const globalNode = global

// Create a single PrismaClient instance for hot-reloading stability
if (!globalNode.prisma) {
  // CRITICAL FIX: Since 'url' is removed from schema.prisma (Prisma 7 rule), 
  // we must pass the database URL directly to the constructor at runtime.
  globalNode.prisma = new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL,
  })
}

const prisma = globalNode.prisma

export default prisma
