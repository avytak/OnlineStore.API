# Build stage
FROM node:20-alpine

WORKDIR /usr/src/app

RUN apk add --no-cache python3 make g++

COPY ../package*.json ./
RUN npm install
COPY ../ ./
COPY .env .env
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
