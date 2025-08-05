'use server'

import { PrismaClient } from '../generated/prisma'
import { withAccelerate } from '@prisma/extension-accelerate'
import { cookies } from 'next/headers'
import { prisma } from '../app/utils/prisma'

export async function incrementSongLikeCount(artistSlug: string, slug: string) {
  const cookieStore = await cookies()
  const fullSlug = [artistSlug, slug].join('/')
  const likedSongs = JSON.parse(cookieStore.get('likedSongs')?.value ?? '[]')
  if (likedSongs.includes(fullSlug)) return null

  const songMetadata = await prisma.songMetadata.findFirst({ where: { artistSlug, slug } })

  if (songMetadata) {
    const newSongMetadata = await prisma.songMetadata.update({
      where: {
        id: songMetadata.id
      },
      data: {
        likeCount: songMetadata.likeCount + 1
      }
    })

    cookieStore.set('likedSongs', JSON.stringify([...likedSongs, fullSlug]))
    return newSongMetadata
  }

  const newSong = await prisma.songMetadata.create({
    data: {
      artistSlug,
      slug,
      likeCount: 1
    }
  })

  cookieStore.set('likedSongs', JSON.stringify([...likedSongs, fullSlug]))
  return newSong
}
