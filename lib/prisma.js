import { PrismaClient } from '@prisma/client'

// Use the explicit 'global' object reference for Node.js environments
const globalNode = global

// Create a single PrismaClient instance for hot-reloading stability
if (!globalNode.prisma) {
  // CRITICAL FIX: This uses the correct 'datasources' object structure to pass the database URL 
  // at runtime, avoiding the "Unknown property" error.
  globalNode.prisma = new PrismaClient({
    datasources: {
      // 'db' corresponds to the name of your datasource block in schema.prisma
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  })
}

const prisma = globalNode.prisma

export default prisma
