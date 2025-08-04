import { FC } from 'react'
import styles from './Waveform.module.css'
import { waveformData } from '../app/utils/waveform'

type Props = {
  progress: number
}

export const Waveform: FC<Props> = ({ progress }) => {
  return (
    <div className={styles.waveform}>
      <div className={styles.upperWave}>
        {waveformData.map((value, index) => (
          <div
            key={[value, index].join('-')}
            className={styles.bar}
            style={{ height: 20 + 19 * value }}
          />
        ))}
      </div>
      <div className={styles.lowerWave}>
        {waveformData.map((value, index) => (
          <div
            key={[value, index].join('-')}
            className={styles.bar}
            style={{ height: 10 + 10 * value }}
          />
        ))}
      </div>
      <div className={styles.reflection} />
      <div className={styles.grid} />
      <div className={styles.overlay} style={{ width: `${100 - progress * 100}%` }} />
    </div>
  )
}
