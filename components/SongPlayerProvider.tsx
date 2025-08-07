'use client'

import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import data from '../soundtrout.json'
import { Artist } from '../types/artist'
import { IndexedSongMetadata, Song } from '../types/song'
import { incrementSongPlayCount } from '../actions/incrementSongPlayCount'
import { fetchSongMetadata } from '../actions/fetchSongMetadata'

type TSongPlayerContent = {
  artists: Artist[]
  songs: Song[]
  songTimes: Record<string, number>
  setSongTimes: (newSongTimes: Record<string, number>) => void
  songMetadata: IndexedSongMetadata
  setSongMetadata: (newSongMetadata: IndexedSongMetadata) => void
  songBuffers: Record<string, AudioBuffer>
  playingSlug: string
  isPlaying: boolean
  playSong: (artistSlug: string, songSlug: string, startAt?: number) => void
  pauseSong: () => void
  loading: boolean
}

const SongPlayerContext = createContext<TSongPlayerContent>({
  artists: [],
  songs: [],
  songTimes: {},
  setSongTimes: (newSongTimes: Record<string, number>) => {},
  songMetadata: {},
  setSongMetadata: (newSongMetadata: IndexedSongMetadata) => {},
  songBuffers: {},
  playingSlug: '',
  isPlaying: false,
  playSong: () => {},
  pauseSong: () => {},
  loading: true
})

export function useSongPlayer() {
  return useContext(SongPlayerContext)
}

type Props = {
  children: ReactNode
}

export const SongPlayerProvider: FC<Props> = ({ children }) => {
  const artists = data.artists ?? []
  const songs = data.songs ?? []
  const indexedSongs: Record<string, Song> = songs.reduce(
    (acc, song) => ({
      ...acc,
      [[song.artistSlug, song.slug].join('/')]: song
    }),
    {}
  )
  const [playingSlug, setPlayingSlug] = useState('')
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null)
  const [songBuffers, setSongBuffers] = useState<Record<string, AudioBuffer>>({})
  const [bufferSource, setBufferSource] = useState<AudioBufferSourceNode | null>(null)
  const [songTimes, setSongTimes] = useState({})
  const isPlaying = useMemo(() => playingSlug !== '', [playingSlug])
  const [startTime, setStartTime] = useState(0)
  const timeout = useRef(null)
  const [songMetadata, setSongMetadata] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const newAudioContext = new AudioContext()
    setAudioContext(newAudioContext)

    fetchSongMetadata().then((newSongMetadata) => {
      setSongMetadata(newSongMetadata)
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    if (!bufferSource) return

    bufferSource.addEventListener('ended', onSongEnded)
    return () => bufferSource.removeEventListener('ended', onSongEnded)
  }, [bufferSource])

  async function loadSong(artistSlug: string, songSlug: string, play: boolean) {
    const fullSlug = [artistSlug, songSlug].join('/')
    if (songBuffers[fullSlug]) {
      return songBuffers[fullSlug]
    }

    const song = indexedSongs[fullSlug]
    const response = await fetch(song.audioUrl)
    const buffer = await response.arrayBuffer()
    const songBuffer = await audioContext.decodeAudioData(buffer)

    setSongBuffers({
      ...songBuffers,
      [fullSlug]: songBuffer
    })

    return songBuffer
  }

  async function playSong(artistSlug: string, songSlug: string, startAt?: number) {
    const fullSlug = [artistSlug, songSlug].join('/')

    if (audioContext.state === 'suspended') {
      await audioContext.resume()
    }

    const songBuffer = await loadSong(artistSlug, songSlug, true)

    if (playingSlug) {
      bufferSource.stop()
      clearTimeout(timeout.current)
      if (!startAt) updateTimes(playingSlug, startTime)
    }

    if (!songTimes[fullSlug]) {
      incrementSongPlayCount(artistSlug, songSlug).then((newSongMetadata) =>
        setSongMetadata({ ...songMetadata, [fullSlug]: newSongMetadata })
      )
    }

    const newBufferSource = audioContext.createBufferSource()
    const offset = startAt ?? songTimes[fullSlug] ?? 0
    newBufferSource.buffer = songBuffer
    newBufferSource.connect(audioContext.destination)
    newBufferSource.start(0, offset)
    setBufferSource(newBufferSource)
    setPlayingSlug(fullSlug)
    const newStartTime = Date.now() - offset * 1000
    setStartTime(newStartTime)
    updateTimes(fullSlug, newStartTime, true)
  }

  function updateTimes(currentPlayingSlug: string, songStartTime: number, loop?: boolean) {
    setSongTimes((prevSongTimes) => ({
      ...prevSongTimes,
      [currentPlayingSlug]: (Date.now() - songStartTime) / 1000
    }))

    if (loop) {
      timeout.current = setTimeout(() => {
        updateTimes(currentPlayingSlug, songStartTime, true)
      }, 100)
    }
  }

  function pauseSong() {
    bufferSource.stop()
    setBufferSource(null)
    clearTimeout(timeout.current)
    updateTimes(playingSlug, startTime)
    setPlayingSlug('')
  }

  function onSongEnded() {
    bufferSource.stop()
    setBufferSource(null)
    clearTimeout(timeout.current)
    setPlayingSlug('')

    setSongTimes((prevSongTimes) => ({
      ...prevSongTimes,
      [playingSlug]: 0
    }))
  }

  const context = useMemo(
    () => ({
      artists,
      songs,
      songTimes,
      setSongTimes,
      songMetadata,
      setSongMetadata,
      songBuffers,
      playingSlug,
      isPlaying,
      playSong,
      pauseSong,
      loading
    }),
    [
      JSON.stringify(artists),
      JSON.stringify(songs),
      JSON.stringify(songTimes),
      JSON.stringify(songMetadata),
      JSON.stringify(songBuffers),
      setSongTimes,
      setSongMetadata,
      playingSlug,
      isPlaying,
      playSong,
      pauseSong,
      loading
    ]
  )

  return <SongPlayerContext.Provider value={context}>{children}</SongPlayerContext.Provider>
}
