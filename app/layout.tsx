import { SongPlayerProvider } from '../components/SongPlayerProvider'
import './global.css'

export const metadata = {
  title: 'Soundtrout',
  description: 'Self-hosted music bringing back full control to its owner.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SongPlayerProvider>{children}</SongPlayerProvider>
      </body>
    </html>
  )
}
