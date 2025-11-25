// lib/prisma.js

import { PrismaClient } from '@prisma/client';

let prisma;

if (process.env.NODE_ENV === 'production') {
  // In production, instantiate normally
  prisma = new PrismaClient();
} else {
  // In development, use a global variable to persist the instance
  // This is the official singleton pattern recommended for Next.js
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;
