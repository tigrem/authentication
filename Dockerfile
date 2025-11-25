# Use the specified Node.js version
FROM node:20.9.0

WORKDIR /usr/src/app

# --- Step 1: Install Dependencies for wait-for-it.sh ---
RUN apt-get update && apt-get install -y --no-install-recommends \
    # FIX: Use the specific package name 'netcat-openbsd'
    netcat-openbsd \ 
    bash \
    wget \
    && rm -rf /var/lib/apt/lists/*

# --- Step 2: Install wait-for-it.sh ---
# Note: We need 'wget' to download the script, which is now included above.
RUN wget https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh -O /usr/local/bin/wait-for-it.sh
RUN chmod +x /usr/local/bin/wait-for-it.sh
# --------------------------------------------------------

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3005

# CMD is overridden by docker-compose.yml
CMD ["npm", "run", "dev"]
