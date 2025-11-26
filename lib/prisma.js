import { PrismaClient } from '@prisma/client'

// Use the explicit 'global' object reference for Node.js environments
// This is necessary to reliably create a single PrismaClient instance during Next.js hot-reloading (development mode).
const globalNode = global

let prisma

if (process.env.NODE_ENV === 'production') {
  // In production, we instantiate the client normally.
  prisma = new PrismaClient()
} else {
  // In development, we store the instance on the global object.
  // This ensures that subsequent reloads use the existing instance, preventing the '__internal' error.
  if (!globalNode.prisma) {
    globalNode.prisma = new PrismaClient()
  }
  prisma = globalNode.prisma
}

export default prisma
