import { PrismaClient } from '@prisma/client'

// 1. Declare a variable to hold the PrismaClient instance.
let prisma;

// 2. Check if we are in the Node.js global environment (i.e., not the browser)
// and if the global object already has a 'prisma' property (which happens 
// during development/hot-reloading).
if (process.env.NODE_ENV === 'production') {
  // In production, we always create a new client.
  prisma = new PrismaClient()
} else {
  // In development, we use the global object to prevent creating multiple 
  // instances during hot-reloading, which causes the "__internal" error.
  if (!global.prisma) {
    global.prisma = new PrismaClient()
  }
  prisma = global.prisma
}

export default prisma
