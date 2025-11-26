import { PrismaConfig } from '@prisma/client/runtime/library'

const config: PrismaConfig = {
  // Define the connection string for the migrate command and direct database access
  datasources: [
    {
      name: 'db',
      url: process.env.DATABASE_URL!, // Use the existing environment variable
      provider: 'postgresql',
    },
  ],
  // Add other global configurations here if needed
  log: ['info', 'warn', 'error'],
}

export default config
