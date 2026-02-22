FROM oven/bun:1 AS builder


WORKDIR /app

COPY . .
RUN bun install -g nx husky

RUN bun install --frozen-lockfile

RUN bun build:downloads

EXPOSE 3000

CMD ["bun", "run", "start:downloads"]
