# ---------------------------
# Stage 1: Build with Node
# ---------------------------
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json* bun.lock* ./

RUN npm install

COPY . .

ENV NX_DAEMON=false

RUN npx nx build downloads

# ---------------------------
# Stage 2: Run with Bun
# ---------------------------
FROM oven/bun:1

WORKDIR /app

COPY --from=builder /app/dist/apps/downloads ./dist
COPY package.json ./

EXPOSE 3000

CMD ["bun", "dist/main.js"]
