import { prisma } from '../app/utils/prisma'

async function main() {
  const songMetadata = await prisma.songMetadata.findMany()
  console.table(songMetadata)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    // 5
    await prisma.$disconnect()
    process.exit(1)
  })
