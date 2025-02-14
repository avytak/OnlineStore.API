# Build stage
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

COPY ../package*.json ./
RUN npm ci
COPY ../ ./
RUN npm run build

# Production stage
FROM node:20-alpine AS runner

WORKDIR /usr/src/app

# Копіюємо лише необхідні файли
RUN npm prune --production
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/package.json ./package.json


EXPOSE 3000

CMD ["npm", "run", "start:local"]

