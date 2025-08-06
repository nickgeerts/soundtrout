import { Song } from '../../types/song'

export function songFullSlug(song: Song) {
  return [song.artistSlug, song.slug].join('/')
}
