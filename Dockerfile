# Use the official Node.js image
FROM node:20.9.0

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install dependencies including devDependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Generate Prisma client (required before starting the app)
RUN npx prisma generate

# Expose the port your app runs on
EXPOSE 3005

# Start the application
CMD ["npm", "run", "dev"]
