import prisma from '../../../lib/prisma'; // Adjust the path based on your structure

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email } = req.body;
    try {
      const newUser = await prisma.user.create({
        data: {
          name,
          email,
        },
      });
      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'User creation failed' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
