# ---- Builder stage ----
FROM node:20-bullseye-slim AS builder

WORKDIR /app

# Install Bun globally and Husky
RUN npm install -g bun husky

# Copy package files and Bun lockfile
COPY package.json ./
COPY bun.lock ./

# Install dependencies using Bun
RUN bun install

# Copy the rest of the project
COPY . .

# Clear Nx cache (optional)
RUN npx nx reset

# Build the downloads app using Bun
RUN bunx nx build downloads

# ---- Production image ----
FROM node:20-bullseye-slim AS runtime

WORKDIR /app

# Install Bun globally
RUN npm install -g bun

# Copy built files from builder
COPY --from=builder /app/dist/apps/downloads ./dist/apps/downloads

# Copy Bun lockfile and package.json for production dependencies
COPY package.json ./
COPY bun.lock ./

# Install only production dependencies using Bun
RUN bun install --production

EXPOSE 3000

# Start the app using Bun
CMD ["bunx", "nx", "serve", "downloads", "--prod"]
