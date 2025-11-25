// pages/api/auth/signup.js

// IMPORTANT: We now import the single Prisma instance from the utility file.
// The Singleton logic (new PrismaClient()) is now in lib/prisma.js
import prisma from '../../../lib/prisma'; 
import { hash } from 'bcryptjs';

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
