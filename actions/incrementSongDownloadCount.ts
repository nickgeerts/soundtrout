'use server'

import { prisma } from '../app/utils/prisma'

export async function incrementSongDownloadCount(artistSlug: string, slug: string) {
  const songMetadata = await prisma.songMetadata.findFirst({ where: { artistSlug, slug } })

  if (songMetadata) {
    const newSongMetadata = await prisma.songMetadata.update({
      where: {
        id: songMetadata.id
      },
      data: {
        downloadCount: songMetadata.downloadCount + 1
      }
    })
    return newSongMetadata
  }

  const newSongMetadata = await prisma.songMetadata.create({
    data: {
      artistSlug,
      slug,
      downloadCount: 1,
    }
  })
  return newSongMetadata
}
