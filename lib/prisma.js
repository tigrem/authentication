// lib/prisma.js
import { PrismaClient } from '@prisma/client';

let prisma;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable to keep the connection pool
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
} else {
  // In production mode, create a new instance
  prisma = new PrismaClient();
}

export default prisma;
