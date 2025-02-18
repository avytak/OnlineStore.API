# Build stage
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

RUN apk add --no-cache python3 make g++
<<<<<<< HEAD
RUN npm install -g @nestjs/cli
=======
>>>>>>> development

COPY ../package*.json ./
RUN npm ci
COPY ../ ./
COPY .env .env
RUN npm run build
<<<<<<< HEAD

=======
>>>>>>> development
# Production stage
FROM node:20-alpine AS runner

WORKDIR /usr/src/app

# Копіюємо лише необхідні файли
RUN npm prune --production
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/package.json ./package.json
COPY .env .env

<<<<<<< HEAD
EXPOSE 3300
=======
EXPOSE 3000
>>>>>>> development

CMD ["npm", "run", "start:prod"]

