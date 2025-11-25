// prisma.config.ts (in your project root)

import { defineConfig } from "@prisma/config";

export default defineConfig({
  datasources: {
    db: {
      // Reference the environment variable here for the CLI tools (generate/migrate)
      url: process.env.DATABASE_URL,
    },
  },
});
