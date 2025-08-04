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

export type SongMetadata = {
  likeCount: number
  playCount: number
}
