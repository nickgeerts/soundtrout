import { notFound } from 'next/navigation'
import { SongPlayer } from '../../components/SongPlayer'
import data from '../../soundtrout.json'
import Link from 'next/link'
import { Container } from '../../components/Container'

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { artists, songs } = data
  const song = songs.find((currentSong) => currentSong.slug === slug)
  const artist = artists.find((currentArtist) => currentArtist.slug === song?.artistSlug)

  if (!song || !artist) {
    notFound()
  }

  return (
    <Container>
      <SongPlayer song={song} />

      <Link href="/" style={{ color: 'white', paddingLeft: 12 }}>
        More songs by {artist.name}
      </Link>
    </Container>
  )
}
