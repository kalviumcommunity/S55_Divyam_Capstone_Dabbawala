# Use a lightweight Node.js base image
FROM node:18-slim

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application's source code
COPY . .

# Expose the port that your app will run on
EXPOSE 3000

# Command to start the application
CMD ["npm", "start"]
