# Use the specified Node.js version
FROM node:20.9.0

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package files and install dependencies
# This leverages Docker layer caching
COPY package*.json ./
RUN npm install

# Copy all application code into the container
COPY . .

# Expose the port the application runs on
EXPOSE 3005

# Define the command to run when the container starts.
# NOTE: This CMD is currently OVERRIDDEN by the 'command' in your 
# docker-compose.yml, which is necessary to include the 'sleep' for stability.
CMD ["sh", "-c", "npx prisma generate && npm run dev"]
