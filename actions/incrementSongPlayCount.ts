'use server'

import { prisma } from '../app/utils/prisma'
import { PrismaClient } from '../generated/prisma'
import { withAccelerate } from '@prisma/extension-accelerate'

export async function incrementSongPlayCount(artistSlug: string, slug: string) {
  const songMetadata = await prisma.songMetadata.findFirst({ where: { artistSlug, slug } })

  if (songMetadata) {
    const newSongMetadata = await prisma.songMetadata.update({
      where: {
        id: songMetadata.id
      },
      data: {
        playCount: songMetadata.playCount + 1
      }
    })
    return newSongMetadata
  }

  const newSongMetadata = await prisma.songMetadata.create({
    data: {
      artistSlug,
      slug,
      playCount: 1
    }
  })
  return newSongMetadata
}
