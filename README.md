# Soundtrout

Self-hosted music streaming website built on React.js and Next.js.

Just edit the configuration and add your own music files to host a complete music streaming solution.

## Deploy

### Requirements

- Docker
- Optionally a web server

### Prepare

- Copy soundtrout.example.json to soundtrout.json and edit it
- Copy .env.example to .env and edit it
- Put your music and image files in `public/data`

### Run with Docker

The Docker setup includes a Postgres server, so only a DOMAIN env var needs to be provided in the .env file.

```
docker compose up
```

### Configure Web server

Configure your web server (e.g. Caddy, Nginx) to reverse-proxy your domain to the binded Docker port. Consult the documentation of your web server software for details.

## Development

### Requirements

- Node 22 or higher
- Postgres database

### Prepare

- Copy soundtrout.example.json to soundtrout.json and edit it
- Copy .env.example to .env and edit it
- Put your music and image files in `public/data`

### Locally develop

```
npm install
npx prisma migrate dev
npm run dev
```

### Build and run natively (when not using Docker)

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
