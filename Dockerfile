# Use the official Node.js 18 Alpine image as the base
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code to the container
COPY . .

# Build the application
RUN npm run build

# Install 'serve' to serve the static files
RUN npm install -g serve

# Expose the port (optional for documentation; Cloud Run sets the $PORT variable)
EXPOSE 8080

# Set environment variables
ENV NODE_ENV=production

# Command to run the app using 'serve' and the port from the $PORT variable
CMD ["sh", "-c", "serve -s dist -l $PORT"]
