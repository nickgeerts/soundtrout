import { notFound } from 'next/navigation'
import { SongPlayer } from '../../components/SongPlayer'
import Link from 'next/link'
import { Container } from '../../components/Container'
import styles from './page.module.css'
import { Metadata } from 'next'
import { indexedArtists, indexedSongs } from '../utils/indexedData'
import { Artist } from '../../types/artist'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const artist: Artist = Object.values(indexedArtists)[0]
  const song = indexedSongs[`${artist?.slug}/${slug}`]
  const title = `${artist?.name} - ${song?.name}`

  return {
    title,
    description: song?.description,
    openGraph: {
      type: 'website',
      siteName: artist?.name,
      images: [{ url: `https://${process.env.DOMAIN}/${song?.coverUrl}` }]
    }
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const artist: Artist = Object.values(indexedArtists)[0]
  const song = indexedSongs[`${artist?.slug}/${slug}`]

  if (!song || !artist) {
    notFound()
  }

  return (
    <Container>
      <SongPlayer song={song} />

      <Link href="/" className={styles.link}>
        More songs by {artist.name}
      </Link>
    </Container>
  )
}
