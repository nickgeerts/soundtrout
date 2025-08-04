import { ArtistHeader } from '../components/ArtistHeader'
import { Container } from '../components/Container'
import { useSongPlayer } from '../components/SongPlayerProvider'
import { Songs } from '../components/Songs'

export default function Page() {
  return (
    <Container>
      <ArtistHeader />
      <Songs />
    </Container>
  )
}
