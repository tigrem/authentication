// prisma.config.ts (in your project root)

import { defineConfig } from "@prisma/config";

export default defineConfig({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});
