FROM node:20 

WORKDIR /usr/src/app

# --- Wait-for-it.sh Setup ---
RUN apt-get update && apt-get install -y --no-install-recommends \
    netcat-openbsd \ 
    bash \
    wget \
    && rm -rf /var/lib/apt/lists/*
    
RUN wget https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh -O /usr/local/bin/wait-for-it.sh
RUN chmod +x /usr/local/bin/wait-for-it.sh
# -----------------------------

COPY package*.json ./

# 1. Install Prisma 7 dependencies needed for the new config
RUN npm install -g typescript ts-node 
RUN npm install @prisma/config
RUN npm install prisma@7.0.0

# 2. Install all regular project dependencies
RUN npm install

# 3. Copy source files (including schema.prisma and prisma.config.ts)
COPY . .

# 4. Explicitly run prisma generate as a final step in the build
# This ensures the client files are created in the node_modules directory
RUN npx prisma generate

EXPOSE 3005

# CMD remains the same, running the wait-for-it script
CMD ["npm", "run", "dev"]
