// This configuration file is now plain JavaScript to avoid execution errors in Docker.

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

module.exports = config
