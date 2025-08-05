import { SongPlayerProvider } from '../components/SongPlayerProvider'
import './global.css'

import { prisma } from './utils/prisma'

export const metadata = {
  title: 'Soundtrout',
  description: 'Self-hosted music bringing back full control to its owner.'
}

const getSongMetadata = async () => {
  const songMetadata = await prisma.songMetadata.findMany()
  const indexedSongMetadata = songMetadata.reduce(
    (acc, metadata) => ({
      ...acc,
      [`${metadata.artistSlug}/${metadata.slug}`]: metadata
    }),
    {}
  )

  return indexedSongMetadata
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const songMetadata = await getSongMetadata()

  return (
    <html lang="en">
      <body>
        <SongPlayerProvider songMetadata={songMetadata}>{children}</SongPlayerProvider>
      </body>
    </html>
  )
}
