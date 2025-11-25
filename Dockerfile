FROM node:20 // Use a recent version of Node 20 LTS

WORKDIR /usr/src/app

// ... (wait-for-it.sh setup remains here)

COPY package*.json ./

// Add Prisma 7 Config Dependencies
RUN npm install -g typescript ts-node 
RUN npm install @prisma/config

// This installs Prisma v7.0.0 from your updated package.json
RUN npm install

// Copy your source files (including schema.prisma and prisma.config.ts)
COPY . .

// Explicitly generate the client files
RUN npx prisma generate

EXPOSE 3005

CMD ["npm", "run", "dev"]
