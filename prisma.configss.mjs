// This configuration file uses ES Modules (.mjs) to ensure proper parsing by Prisma 7.

/** @type {import('@prisma/client/runtime/library').PrismaConfig} */
const config = {
  // Define the connection string for the migrate command and direct database access
  datasources: [
    {
      name: 'db',
      // We use process.env.DATABASE_URL which should now be available from the Dokploy environment
      url: process.env.DATABASE_URL, 
      provider: 'postgresql',
    },
  ],
  log: ['info', 'warn', 'error'],
}

// Use export default for ES Modules
export default config
