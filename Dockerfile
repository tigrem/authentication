FROM node:20.9.0

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

# Add necessary packages for Prisma 7 config
RUN npm install -g typescript ts-node
RUN npm install @prisma/config

COPY . .

EXPOSE 3005

# CMD remains the same
CMD ["sh", "-c", "npx prisma generate && npm run dev"]
