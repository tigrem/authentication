import { PrismaClient } from '@prisma/client';

// 1. Get the global object (which is 'global' in Node.js, and 'window' in browser, etc.)
const globalForPrisma = globalThis;

// 2. Reuse the client if it already exists on the global object during development
// The '||=' operator creates the new client if 'globalForPrisma.prisma' is falsy (i.e., not yet created).
const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query', 'info', 'warn', 'error'], // Add logs if you want to see the generated SQL
  });

// 3. In development, save the client on the global object for Fast Refresh
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
