import { PrismaClient } from '@prisma/client';

let prisma; // Declare a variable to hold the PrismaClient instance

if (process.env.NODE_ENV === 'development') {
  // In development mode, reuse the global variable
  if (!global.prisma) {
    global.prisma = new PrismaClient(); // Initialize PrismaClient if not already done
  }
  prisma = global.prisma; // Assign the global variable to prisma
} else {
  // In production mode, create a new instance of PrismaClient
  prisma = new PrismaClient();
}

export default prisma; // Export the initialized PrismaClient
