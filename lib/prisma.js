import { PrismaClient } from '@prisma/client'

// Use the explicit 'global' object reference for Node.js environments
const globalNode = global

// Create a single PrismaClient instance for hot-reloading stability
if (!globalNode.prisma) {
  // FINAL FIX: No parameters passed. The Client will now fall back to using 
  // the DATABASE_URL environment variable, which is the most stable configuration 
  // and avoids the "Unknown property datasources" error.
  globalNode.prisma = new PrismaClient()
}

const prisma = globalNode.prisma

export default prisma
