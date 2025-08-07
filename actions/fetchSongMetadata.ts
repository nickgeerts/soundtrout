'use server'

import { prisma } from '../app/utils/prisma'

export async function fetchSongMetadata() {
  const songMetadata = await prisma.songMetadata.findMany()
  const indexedSongMetadata = songMetadata.reduce(
    (acc, metadata) => ({
      ...acc,
      [`${metadata.artistSlug}/${metadata.slug}`]: metadata
    }),
    {}
  )

  return indexedSongMetadata
}
