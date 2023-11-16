import { Box, Text, flexbox } from '@chakra-ui/react'
import styles from './TimeRemaining.module.scss'
import InformationContainer from '@/app/components/information-container/InformationContainer'

export default function TimeRemaining({}: {}) {
  return (
    <InformationContainer>
      {/* Timer */}
      <Box className={styles.container}>
        <Text>Temps restant : </Text>
        <Text className={styles.Timer}>5:50</Text>
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
