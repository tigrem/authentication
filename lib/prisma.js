import { PrismaClient } from '@prisma/client'

// Use the explicit 'global' object reference for Node.js environments
const globalNode = global

// Create a single PrismaClient instance for hot-reloading stability
if (!globalNode.prisma) {
  // Rely on the DATABASE_URL environment variable as specified in schema.prisma
  globalNode.prisma = new PrismaClient()
}

const prisma = globalNode.prisma

export default prisma
