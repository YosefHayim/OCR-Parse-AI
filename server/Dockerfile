# Use official Node.js image
FROM node:18

# Install ImageMagick
RUN apt-get update && apt-get install -y imagemagick

# Set working directory
WORKDIR /app

# Copy package files and install deps
COPY package*.json ./
RUN npm install

# Copy the rest of your source
COPY . .

# Expose your server's port (e.g., 3000)
EXPOSE 3000

# Start the server
CMD ["npm", "run", "start"]
