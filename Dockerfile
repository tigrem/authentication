FROM node:20.9.0

WORKDIR /usr/src/app

# --- New Step to install wait-for-it ---
RUN apt-get update && apt-get install -y --no-install-recommends \
    netcat \
    bash \
    && rm -rf /var/lib/apt/lists/*
    
RUN wget https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh -O /usr/local/bin/wait-for-it.sh
RUN chmod +x /usr/local/bin/wait-for-it.sh
# --------------------------------------

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3005

# CMD is no longer strictly used, but kept simple
CMD ["npm", "run", "dev"]
