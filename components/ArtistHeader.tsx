'use client'

import { FC } from 'react'
import { useSongPlayer } from './SongPlayerProvider'
import styles from './ArtistHeader.module.css'

export const ArtistHeader: FC = () => {
  const { artists } = useSongPlayer()
  const artist = artists[0]

  return (
    <div>
      <div className={styles.nameContainer}>
        <div className={styles.name}>{artist.name}</div>
      </div>
      <div className={styles.description}>
        {artist.description}
      </div>
    </div>
  )
}
