# Soundtrout

Self-hosted music streaming website built on React.js and Next.js.

## Requirements

- Node 22 or higher
- Postgres database

## Prepare

- Copy soundtrout.example.json to soundtrout.json and edit it
- Copy .env.example to .env and edit it
- Put your files in /public/data

## Locally develop

```
npm install
npx prisma migrate dev
npm run dev
```

## Build and run with Docker

The Docker setup includes a Postgres server, so only a DOMAIN env var needs to be provided in the .env file.

```
docker compose up
```

## Build and run natively

```
npm install
npx prisma migrate deploy
npm run build
npm run start
```

## To do

- Better song view
- Better artist view
- Mini-player
- Auto-play all songs
- Multi-artist view
- Light theme
