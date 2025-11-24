// prisma.config.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  adapter: 'postgresql',       // use direct DB connection
  datasource: process.env.DATABASE_URL,  // make sure this env var exists
});

export default prisma;
