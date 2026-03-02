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
RUN bun run build:downloads
# RUN bun run build:e-coop-admin
# RUN bun run build:e-coop-core
# RUN bun run build:e-coop-member

EXPOSE 3000
EXPOSE 3001
EXPOSE 3002
EXPOSE 3003

CMD ["sh", "-c", "bun run start:downloads"]
