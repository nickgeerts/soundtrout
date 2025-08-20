import { Footer } from '../components/Footer'
import { SongPlayerProvider } from '../components/SongPlayerProvider'
import './global.css'

export const metadata = {
  title: 'Soundtrout',
  description: 'Self-hosted music streaming website built on React.js and Next.js.'
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main>
          <SongPlayerProvider>{children}</SongPlayerProvider>
        </main>
        <Footer />
      </body>
    </html>
  )
}
