// pages/api/auth/signup.js

import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

// --- START: SINGLETON IMPLEMENTATION ---
// This prevents multiple PrismaClient instances from being created during 
// development (hot module reloading) which causes the "TypeError: Cannot read properties of undefined..." error.

let prisma;

if (process.env.NODE_ENV === 'production') {
  // In production, instantiate normally
  prisma = new PrismaClient();
} else {
  // In development, use a global variable to persist the instance
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

// --- END: SINGLETON IMPLEMENTATION ---


export default async function handler(req, res) {
  // 1. Check HTTP Method
  if (req.method !== "POST") {
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  const { email, password } = req.body;
  
  // 2. Validate Input
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    // 3. Hash Password
    const hashedPassword = await hash(password, 10);
    
    // 4. Create User in Database
    const user = await prisma.user.create({
      data: { 
        email, 
        password: hashedPassword 
      },
    });
    
    // 5. Respond with Success
    res.status(201).json(user);
    
  } catch (err) {
    // 6. Handle Errors (e.g., unique constraint violation for email)
    console.error(err);
    
    // Check for Prisma unique constraint error (P2002) for better user feedback
    if (err.code === 'P2002' && err.meta?.target.includes('email')) {
        return res.status(409).json({ message: "This email address is already registered." });
    }

    res.status(500).json({ message: "Server error during sign up. Please try again." });
  }
}
