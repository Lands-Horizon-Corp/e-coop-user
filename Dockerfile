# ---- Builder + Runtime (single stage) ----
FROM node:20-bullseye-slim

WORKDIR /app

# Install Bun globally and Husky
RUN npm install -g bun husky

# Copy the full project
COPY . .

# Install dependencies using Bun
RUN bun install

# Optional: clear Nx cache
RUN npx nx reset

# Build the downloads app
RUN bunx nx build downloads

ENV PORT=3000
EXPOSE 3000

CMD ["sh", "-c", "bunx serve apps/downloads/dist -l $PORT --single"]
