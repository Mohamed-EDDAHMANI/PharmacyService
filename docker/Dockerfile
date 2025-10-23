FROM node:20-alpine
WORKDIR /app

# Install build tools
RUN apk add --no-cache python3 make g++ 

# Copy package files
COPY package*.json ./

# Install all dependencies (dev + prod)
RUN npm install --unsafe-perm

# Copy source code
COPY . .

# Set environment
ENV NODE_ENV=development
ENV PORT=3002

# Expose port
EXPOSE 3002

# Start app in dev mode (ensure package.json has "dev" script)
CMD ["npm", "run", "dev"]