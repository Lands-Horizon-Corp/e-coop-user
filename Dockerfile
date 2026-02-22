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
RUN bunx nx build e-coop-admin
RUN bunx nx build e-coop-core
RUN bunx nx build e-coop-member

EXPOSE 3000
EXPOSE 3001
EXPOSE 3002
EXPOSE 3003

CMD ["sh", "-c", "bun run start:downloads & bun run start:e-coop-admin & bun run start:e-coop-core & bun run start:e-coop-member"]
