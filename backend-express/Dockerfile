FROM node:18-alpine as base

WORKDIR /app
COPY package*.json ./
COPY tsconfig.json ./

FROM base as development
ENV NODE_ENV=development
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]

FROM base as builder
RUN npm install
COPY . .
RUN npm run build

FROM base as production
ENV NODE_ENV=production
RUN npm install --production
COPY --from=builder /app/dist ./dist
CMD ["npm", "start"] 