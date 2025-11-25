FROM node:20.9.0

WORKDIR /usr/src/app

# --- Wait-for-it.sh Setup (Necessary for connection stability) ---
RUN apt-get update && apt-get install -y --no-install-recommends \
    netcat-openbsd \ 
    bash \
    wget \
    && rm -rf /var/lib/apt/lists/*
    
RUN wget https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh -O /usr/local/bin/wait-for-it.sh
RUN chmod +x /usr/local/bin/wait-for-it.sh
# ----------------------------------------------------------------

COPY package*.json ./

# --- Add Dependencies for Prisma 7.0.0 Configuration ---
# Install global tools for running the .ts config file
RUN npm install -g typescript ts-node 
RUN npm install @prisma/config
# -------------------------------------------------------

RUN npm install

COPY . .

EXPOSE 3005

CMD ["npm", "run", "dev"]
