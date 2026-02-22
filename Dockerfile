# Use a Node image for Docker builds
FROM node:20-bullseye-slim AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./
COPY bun.lock ./

# Install Node dependencies
RUN npm ci

# Copy the rest of the project
COPY . .

# Optional: Clear Nx cache
RUN npx nx reset

# Build the downloads app using Node (stable)
RUN npx nx build downloads

# ---- Production image ----
FROM node:20-bullseye-slim AS runtime

WORKDIR /app

# Copy built files from builder
COPY --from=builder /app/dist/apps/downloads ./dist/apps/downloads
COPY package.json package-lock.json ./

# Install only production dependencies
RUN npm ci --production

EXPOSE 3000

# Start the downloads app
CMD ["npx", "nx", "serve", "downloads", "--prod"]
