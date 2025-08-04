'use client'

import { FC, useMemo, MouseEvent, useRef } from 'react'
import styles from './SongPlayer.module.css'
import { Song } from '../types/song'
import { useSongPlayer } from './SongPlayerProvider'
import { Waveform } from './Waveform'
import Link from 'next/link'

type Props = {
  song: Song
}

const PlayButton = ({ onClick, isPlaying }) => (
  <div className={styles.play} onClick={onClick}>
    {isPlaying ? (
      <img src="/icons/pause.svg" className={styles.pauseIcon} />
    ) : (
      <img src="/icons/play.svg" className={styles.playIcon} />
    )}
  </div>
)

export const SongPlayer: FC<Props> = ({ song }) => {
  const { songTimes, songBuffers, songMetadatas, artists, playSong, pauseSong, playingSlug } =
    useSongPlayer()
  const artist = artists.find((currentArtist) => currentArtist.slug === song.artistSlug)
  const fullSlug = [artist.slug, song.slug].join('/')
  const songMetadata = songMetadatas[fullSlug]
  const songTime = songTimes[fullSlug]
  const songBuffer = songBuffers[fullSlug]
  const progress = songBuffer ? songTime / songBuffer.duration : 0
  const songIsPlaying = useMemo(() => playingSlug === fullSlug, [playingSlug, fullSlug])
  const waveformRef = useRef<HTMLDivElement | null>(null)

  const onPlayPause = () => {
    if (songIsPlaying) {
      pauseSong()
    } else {
      playSong(artist.slug, song.slug)
    }
  }

  const onClickWaveform = (event: MouseEvent) => {
    if (!songIsPlaying) {
      playSong(artist.slug, song.slug)
      return
    }

    const rect = waveformRef.current.getBoundingClientRect()
    const newSongTime =
      (songBuffer.duration * (event.clientX - rect.left)) / (rect.right - rect.left)
    playSong(artist.slug, song.slug, newSongTime)
  }

  return (
    <div className={styles.songPlayer}>
      <Link href={`/${song.slug}`}>
        <img src={song.coverUrl} className={styles.cover} />
      </Link>

      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.title}>
            <PlayButton isPlaying={songIsPlaying} onClick={() => onPlayPause()} />

            <div>
              <Link href="/" className={styles.link}>
                <p className={styles.artist}>{artist.name}</p>
              </Link>
              <Link href={`/${song.slug}`} className={styles.link}>
                <p>{song.title}</p>
              </Link>
            </div>
          </div>

          <div className={styles.metadata}>
            <div className={styles.date}>1 month ago</div>
            <div className={styles.genre}># {song.genre}</div>
          </div>
        </div>

        <div className={styles.waveform} ref={waveformRef} onClick={onClickWaveform}>
          <Waveform progress={progress} />
        </div>

        <div className={styles.footer}>
          <div className={styles.actions}>
            <button className={styles.action}>
              <img src="/icons/heart.svg" className={styles.heartIcon} />
              {songMetadata.likeCount}
            </button>
          </div>

          <div className={styles.plays}>
            <img src="/icons/play.svg" className={styles.playsIcon} />
            {songMetadata.playCount}
          </div>
        </div>
      </div>
    </div>
  )
}
