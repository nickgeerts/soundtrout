FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
ARG NODE_ENV
ENV NODE_ENV $NODE_ENV
ARG DATABASE_URL
ENV DATABASE_URL $DATABASE_URL
ARG DOMAIN
ENV DOMAIN $DOMAIN
RUN npx prisma generate
RUN npm run build

EXPOSE 3000
CMD ["sh", "-c", "npm run start"]
