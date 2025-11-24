import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

// Direct database URL, no adapter
const prisma = new PrismaClient({
  connectionString: "postgresql://myuser:mypassword@my-postgres:5432/mydb?schema=public",
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
      const hashedPassword = await hash(password, 10);
      const user = await prisma.user.create({
        data: { email, password: hashedPassword },
      });
      res.status(201).json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
