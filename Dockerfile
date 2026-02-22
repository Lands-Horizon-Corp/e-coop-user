# Builder stage
FROM node:20-bullseye-slim AS builder

WORKDIR /app

# Copy package files
COPY package.json ./
COPY bun.lock ./

# Install dependencies
RUN npm install

# Copy rest of project
COPY . .

# Clear Nx cache (optional)
RUN npx nx reset

# Build downloads app
RUN npx nx build downloads

# ---- Production image ----
FROM node:20-bullseye-slim AS runtime

WORKDIR /app

# Copy built files
COPY --from=builder /app/dist/apps/downloads ./dist/apps/downloads
COPY package.json ./

# Install only production dependencies
RUN npm install --production

EXPOSE 3000

# Start app
CMD ["npx", "nx", "serve", "downloads", "--prod"]
