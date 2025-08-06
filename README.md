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

## Build and run

```
npm install
npx prisma migrate deploy
npm run build
npm run start
```

## To do

- Mini-player
- Auto-play all songs
- Containerize
- Multi-artist view
- Light theme
