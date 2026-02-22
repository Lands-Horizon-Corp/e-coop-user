FROM oven/bun:1 AS builder

WORKDIR /app

# Copy only dependency files first
COPY package.json bun.lock ./

# Install deps
RUN bun install -g husky
RUN bun install --frozen-lockfile

# Copy rest of project
COPY . .

# Disable Nx daemon inside Docker
ENV NX_DAEMON=false

# Build
RUN bun build:downloads

EXPOSE 3000

CMD ["bun", "run", "start:downloads"]
