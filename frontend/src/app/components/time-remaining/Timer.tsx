import { useCallback, useState } from 'react'
import Countdown, { zeroPad } from 'react-countdown'
import styles from './TimeRemaining.module.scss'

export const Timer = ({ initialTime, onTimeUp }) => {
  const [timerKey, setTimerKey] = useState(0)

  const handleTimeUp = useCallback(() => {
    onTimeUp()
    setTimerKey((prevKey) => prevKey + 1)
  }, [onTimeUp])

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      handleTimeUp()
      return null
    } else {
      return (
        <span className={styles.Timer}>
          {hours === 0 ? null : zeroPad(hours) + ':'}
          {zeroPad(minutes)}:{zeroPad(seconds)}
        </span>
      )
    }
  }

  return (
    <div>
      <Countdown
        key={timerKey}
        date={Date.now() + initialTime * 1000}
        renderer={renderer}
      />
    </div>
  )
}
