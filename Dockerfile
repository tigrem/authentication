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

# --- Add Dependencies for Prisma 7.0.0 Configuration ---
# Install tools to read the .ts config file
RUN npm install -g typescript ts-node 
RUN npm install @prisma/config
# CRITICAL: Install Prisma 7 locally to prevent npx from fetching it every time
# You should also update your package.json to match this version if possible
RUN npm install prisma@7.0.0
# -------------------------------------------------------

RUN npm install

COPY . .

EXPOSE 3005

CMD ["npm", "run", "dev"]
