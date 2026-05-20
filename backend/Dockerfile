# Use official Node.js 20 image as base
FROM node:20-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package files first for better layer caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Generate Prisma client inside the container
RUN npx prisma generate

# Expose the port the app runs on
EXPOSE 3000

# Start the server
COPY start.sh ./
RUN chmod +x start.sh
CMD ["sh", "start.sh"]