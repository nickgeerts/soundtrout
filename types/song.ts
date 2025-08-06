import { SongMetadata } from '../generated/prisma'

export type Song = {
  slug: string
  artistSlug: string
  name: string
  audioUrl: string
  coverUrl: string
  downloadUrl?: string
  genre: string
  publishedAt: string
  description?: string
}

export type IndexedSongMetadata = Record<string, SongMetadata>
