// pages/api/auth/signup.js

import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

// --- ROBUST SINGLETON IMPLEMENTATION ---
// We use a conditional check on the global object for persistence,
// and make sure we only instantiate once.

let prisma;

if (process.env.NODE_ENV === 'production') {
  // Production environment: Always create a new instance (no HMR concerns)
  prisma = new PrismaClient();
} else {
  // Development environment (next dev): Use the global object
  if (!global._prisma) {
    global._prisma = new PrismaClient();
  }
  prisma = global._prisma;
}

// --- END: SINGLETON IMPLEMENTATION ---


export default async function handler(req, res) {
  // ... (rest of your handler function code remains the same)
  // The 'prisma' object is now correctly defined above.
  // ...
