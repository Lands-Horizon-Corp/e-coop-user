FROM oven/bun:1 AS builder


WORKDIR /app

COPY . .
RUN bun install -g nx husky

RUN bun install --frozen-lockfile

RUN bun run build:downloads


CMD ["bun", "run", "start:downloads"]