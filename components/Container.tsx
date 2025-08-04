import { FC, ReactNode } from 'react'
import styles from './Container.module.css'

type Props = {
  children: ReactNode
}

export const Container: FC<Props> = ({ children }) => (
  <div className={styles.container}>{children}</div>
)
