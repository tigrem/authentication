import prisma from '../../../lib/prisma'; // Assumes lib is one directory up from 'api'
import bcrypt from 'bcryptjs';

export default async function handle(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
      },
    });

    return res.status(201).json({ message: 'User created successfully', userId: user.id });

  } catch (error) {
    if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
      return res.status(409).json({ message: 'A user with this email already exists.' });
    }
    
    console.error("Signup API Error:", error);
    return res.status(500).json({ message: 'An internal error occurred during signup.' });
  }
}
