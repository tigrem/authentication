# --- STAGE 1: Dependency Installation & Prisma Generation ---
# This stage installs all dependencies and generates the Prisma client.
FROM node:20 as dependencies

# Set working directory
WORKDIR /usr/src/app

# Install system dependencies (netcat-openbsd for wait-for-it.sh)
RUN apt-get update && apt-get install -y --no-install-recommends \
    netcat-openbsd \
    bash \
    wget \
    && rm -rf /var/lib/apt/lists/*

# Install wait-for-it.sh script
RUN wget https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh -O /usr/local/bin/wait-for-it.sh
RUN chmod +x /usr/local/bin/wait-for-it.sh

# Copy package files for dependency installation
COPY package.json package-lock.json ./

# Install all dependencies
RUN npm install

# --- STAGE 2: Build & Runtime Environment ---
FROM node:20

# Set working directory
WORKDIR /usr/src/app

# Copy the wait-for-it.sh script from the dependencies stage
COPY --from=dependencies /usr/local/bin/wait-for-it.sh /usr/local/bin/wait-for-it.sh

# Copy package files and node_modules (dependencies)
COPY package.json package-lock.json ./
COPY --from=dependencies /usr/src/app/node_modules ./node_modules

# COPY APPLICATION SOURCE CODE (lib/prisma.js, schema.prisma, prisma.config.ts)
COPY . .
# Explicitly force-copying the prisma configuration files to bypass cache
COPY prisma ./prisma
COPY prisma.config.ts ./

# 🚨 FIX: Install ts-node and typescript globally in the runtime stage
# This is required to allow 'npx prisma generate' to parse the TypeScript 'prisma.config.ts' file
# and should resolve the "Failed to parse syntax" error (P1012 after initial fix).
RUN npm install -g typescript ts-node 

# Run Prisma generation. This step should now succeed.
RUN npx prisma generate

# CRITICAL FIX: Delete the Next.js cache directory.
RUN rm -rf .next/cache

EXPOSE 3005

# Start the application.
CMD sh -c "/usr/local/bin/wait-for-it.sh 196.190.220.43:5434 --timeout=60 --strict -- \
    npm run dev"


### Instructions

1.  **Copy** the entire content block above.
2.  **Paste** it into your `Dockerfile`, replacing the previous content.
3.  **Commit, Push, and Redeploy** on Dokploy.

This final modification should address the "Failed to parse syntax" error and allow your build to complete.
