FROM node:26-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm config set min-release-age 7
RUN npm config set ignore-scripts true
RUN npm install

FROM base AS builder
WORKDIR /app
COPY . .
ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV
ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL
ARG DOMAIN
ENV DOMAIN=$DOMAIN
RUN npm run clean
RUN npx prisma generate
RUN npm run ci
RUN npm run build

EXPOSE 3000
CMD ["sh", "-c", "npm run start"]
