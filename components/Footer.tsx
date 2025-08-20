import { FC } from 'react'
import styles from './Footer.module.css'

export const Footer: FC = () => {
  return (
    <div className={styles.footer}>
      Powered by{' '}
      <a href="https://soundtrout.org" target="_blank">
        SoundTrout
      </a>
    </div>
  )
}
