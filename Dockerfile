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
# Make sure Prisma and @prisma/client are listed in your package.json
# Prisma v7 dependencies: @prisma/config, typescript, ts-node should also be listed.

# Run a single, clean installation of all dependencies (including Prisma)
RUN npm install 

# Copy source files (including schema.prisma and prisma.config.ts)
COPY . .

# IMPORTANT: Keep this generation step, as it creates the client files
# The command running in your docker-compose will also run this, but running it here 
# ensures the files are present in the final image's node_modules.
RUN npx prisma generate

EXPOSE 3005

CMD ["npm", "run", "dev"]
