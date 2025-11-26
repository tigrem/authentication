import { PrismaClient } from '@prisma/client'

// Define a unique key for the global object cache
const prismaGlobalKey = Symbol.for('prisma.client.global')

// Use a conditional global object to prevent multiple PrismaClient instantiations
// during Next.js Hot Module Replacement (HMR) in development.
const globalForPrisma = globalThis

const prisma = 
  globalForPrisma[prismaGlobalKey] || 
  new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma[prismaGlobalKey] = prisma
}

export default prisma
