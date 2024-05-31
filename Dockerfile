
# Stage 1: Build stage
FROM node:22.0.0-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN NODE_ENV=development npm i

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build 

# Stage 2: Production stage
FROM node:22.0.0-alpine

# Set working directory
WORKDIR /app

# Copy built files from the previous stage
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/package.json ./
COPY --from=build /app/node_modules ./node_modules

# Expose port 3000
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "start"]
