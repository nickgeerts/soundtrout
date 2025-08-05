import { SongMetadata } from '../generated/prisma'

export type Song = {
  slug: string
  artistSlug: string
  title: string
  audioUrl: string
  coverUrl: string
  downloadUrl?: string
  genre: string
  publishedAt: string
}

export type IndexedSongMetadata = Record<string, SongMetadata>
