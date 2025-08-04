'use client'

import { SongPlayer } from './SongPlayer'
import { useSongPlayer } from './SongPlayerProvider'
import styles from './Songs.module.css'

export const Songs = () => {
  const { songs } = useSongPlayer()

  return (
    <div className={styles.songs}>
      {songs.map((song) => (
        <SongPlayer key={song.slug} song={song} />
      ))}
    </div>
  )
}
