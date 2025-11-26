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
# This stage uses a clean image and only copies necessary files for the final runtime.
FROM node:20

# Set working directory
WORKDIR /usr/src/app

# Copy the wait-for-it.sh script from the dependencies stage
COPY --from=dependencies /usr/local/bin/wait-for-it.sh /usr/local/bin/wait-for-it.sh

# Copy package files and node_modules (dependencies)
COPY package.json package-lock.json ./
COPY --from=dependencies /usr/src/app/node_modules ./node_modules

# Copy application source code (including lib/prisma.js and schema.prisma)
COPY . .

# Run Prisma generation to ensure the Query Engine binaries are correctly placed.
RUN npx prisma generate

# CRITICAL FIX: Delete the Next.js cache directory.
# This step is essential to resolve the "Cannot read properties of undefined (reading '__internal')"
# TypeError by forcing a fresh start of the Next.js development server.
RUN rm -rf .next/cache

EXPOSE 3005

# Start the application. Using the external IP/Port is the necessary workaround
# since internal Dokploy networking is failing.
CMD sh -c "/usr/local/bin/wait-for-it.sh 196.190.220.43:5434 --timeout=60 --strict -- \
    npm run dev"
