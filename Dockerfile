# ---- Builder stage ----
FROM node:20-bullseye-slim AS builder

WORKDIR /app

RUN npm install -g bun husky

COPY . .

RUN bun install
RUN npx nx reset
RUN bunx nx build downloads


# ---- Runtime stage ----
FROM node:20-bullseye-slim

WORKDIR /app

RUN npm install -g bun

# Copy ONLY the built files
COPY --from=builder /app/dist/apps/downloads ./dist

ENV PORT=3000
EXPOSE 3000

# Important: SPA mode for React/Vue routing
CMD ["sh", "-c", "bunx serve dist -l $PORT --single"]
