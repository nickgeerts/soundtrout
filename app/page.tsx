import { ArtistHeader } from '../components/ArtistHeader'
import { Container } from '../components/Container'
import { Songs } from '../components/Songs'
import data from '../soundtrout.json'

export async function generateMetadata() {
  const artist = data.artists[0]

  return {
    title: artist.name,
    description: artist.description
  }
}

export default function Page() {
  return (
    <Container>
      <ArtistHeader />
      <Songs />
    </Container>
  )
}
