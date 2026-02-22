FROM oven/bun:1.1.43 AS builder

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
ENV NX_ISOLATE_PLUGINS=false

RUN bun run build:downloads
# Build
FROM oven/bun:1-slim
WORKDIR /app
COPY --from=builder /app /app
EXPOSE 3000

CMD ["bun", "run", "start:downloads"]
