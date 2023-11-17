import { Box, Center, Text } from '@chakra-ui/react'
import styles from './TimeRemaining.module.scss'
import InformationContainer from '@/app/components/information-container/InformationContainer'
import { Timer } from './Timer'
import { useState } from 'react'

export default function TimeRemaining({}: {}) {
  const [time, setTime] = useState(3605)

  const handleTimeUp = () => {
    setTime(time + 5)
  }

  return (
    <InformationContainer>
      <Box className={styles.container}>
        <Text>Temps restant : </Text>
        <Timer initialTime={time} onTimeUp={handleTimeUp} />
        <Box className={styles.TimerZone}>
          <Box className={styles.InfoZone}>
            <Text className={styles.InfoText}>
              small blind / big blind / ante :
            </Text>
          </Box>
          <Box className={styles.InfoZone}>
            <Text className={styles.InfoText}>BTN : {}</Text>
          </Box>
        </Box>
        <Box className={styles.PotTotal}>
          <Text>Pot Total :</Text>
          <Text className={styles.Total}> 100 000</Text>
        </Box>
      </Box>
    </InformationContainer>
  )
}
