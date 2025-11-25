import 'dotenv/config';  // Ensure you load environment variables
import { defineConfig } from "@prisma/config";

export default defineConfig({
  datasources: {
    db: {
      url: process.env.DATABASE_URL, // Using DATABASE_URL from .env
    },
  },
  // Additional options can be added here if needed later
});
