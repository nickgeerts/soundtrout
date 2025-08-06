import data from '../../soundtrout.json'
import { Artist } from '../../types/artist'
import { Song } from '../../types/song'
import { songFullSlug } from './song'

export const indexedSongs: Record<string, Song> = data.songs.reduce(
  (acc, song) => ({
    ...acc,
    [songFullSlug(song)]: song
  }),
  {}
)

export const indexedArtists: Record<string, Artist> = data.artists.reduce(
  (acc, artist) => ({
    ...acc,
    [artist.slug]: artist
  }),
  {}
)

export const soundtroutConfig = data.config ?? {}
