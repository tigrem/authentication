# Use a recent version of Node 20 LTS
FROM node:20 

WORKDIR /usr/src/app

# --- Wait-for-it.sh Setup ---
# You need a single, clean apt-get install line
RUN apt-get update && apt-get install -y --no-install-recommends \
    netcat-openbsd \ 
    bash \
    wget \
    && rm -rf /var/lib/apt/lists/*
    
RUN wget https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh -O /usr/local/bin/wait-for-it.sh
RUN chmod +x /usr/local/bin/wait-for-it.sh
# -----------------------------

COPY package*.json ./

# The following two lines install necessary tools for prisma.config.ts
RUN npm install -g typescript ts-node 
RUN npm install @prisma/config

# This installs Prisma v7.0.0 based on your updated package.json
RUN npm install

# Copy all source files (schema.prisma, prisma.config.ts, etc.)
COPY . .

# CRITICAL: This explicitly runs generate, now including the "debian-openssl-3.0.x" binary
RUN npx prisma generate

EXPOSE 3005

CMD ["npm", "run", "dev"]
