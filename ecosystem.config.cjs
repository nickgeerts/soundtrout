const name = 'nickbreed'
const script = 'node_modules/.bin/next'
const port = 3010
const args = `start -p ${port}`
const repo = 'git@github.com:nickgeerts/soundtrout.git'
const build = 'npm install && npx prisma migrate deploy && npx prisma generate && npm run build'

module.exports = {
  apps: [
    {
      name,
      script,
      args,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: port
      }
    }
  ],

  deploy: {
    production: {
      user: 'deploy',
      host: 'nickgeerts.com',
      ref: 'origin/main',
      repo,
      ssh_options: 'ForwardAgent=yes',
      path: `/home/deploy/${name}`,
      'post-deploy': `${build} && pm2 reload ecosystem.config.cjs --env production && pm2 save`
    }
  }
}
