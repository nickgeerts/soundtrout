import { Song } from '../../types/song'

let cachedWaveformData: number[]

export function songFullSlug(song: Song) {
  return [song.artistSlug, song.slug].join('/')
}
