# ---- Builder stage ----
FROM node:20-bullseye-slim AS builder

WORKDIR /app

# Install Bun globally and Husky
RUN npm install -g bun husky

# Copy the full project first
COPY . .

# Install dependencies using Bun
RUN bun install

# Optional: clear Nx cache
RUN npx nx reset

# Build the downloads app
RUN bunx nx build downloads

CMD ["bunx", "serve", "-s", "dist/apps/downloads", "-l", "3000"]
