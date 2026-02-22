FROM oven/bun:1 AS builder


WORKDIR /app

COPY package.json bun.lock ./

RUN bun install -g nx husky

RUN bun install --frozen-lockfile

COPY . .

RUN bun run build:downloads

EXPOSE 3000

CMD ["bun", "run", "start:downloads"]
