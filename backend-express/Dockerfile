# Base stage with PNPM
FROM node:20-alpine as base
WORKDIR /app

# Enable corepack for PNPM
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source files
COPY . .

# Test stage
FROM base as test
CMD ["pnpm", "test"]

# Development stage
FROM base as development
CMD ["pnpm", "dev"]

# Production stage
FROM node:20-alpine as production
WORKDIR /app
COPY --from=base /app/dist ./dist
COPY --from=base /app/node_modules ./node_modules
CMD ["node", "dist/server.js"] 