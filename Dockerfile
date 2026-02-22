FROM oven/bun:1 AS builder

WORKDIR /app

# Copy only dependency files first
COPY package.json bun.lock ./

# Install deps
RUN bun install --frozen-lockfile
RUN bun install -g husky

# Copy rest of project
COPY . .

# Disable Nx daemon inside Docker
ENV NX_DAEMON=false

# Build
RUN bunx nx build:downloads

EXPOSE 3000

CMD ["bun", "run", "start:downloads"]
