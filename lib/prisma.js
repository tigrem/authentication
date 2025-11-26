import { PrismaClient } from '@prisma/client'

// This pattern prevents creating multiple PrismaClient instances in Next.js
// development mode due to Hot Module Replacement (HMR).

let prisma;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  // Use globalThis to store the client instance.
  if (!globalThis.prisma) {
    globalThis.prisma = new PrismaClient() 
  }
  prisma = globalThis.prisma
}

export default prisma
