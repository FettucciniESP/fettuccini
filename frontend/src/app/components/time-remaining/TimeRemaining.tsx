import { Box, Text } from '@chakra-ui/react'
import styles from './TimeRemaining.module.scss'
import InformationContainer from '@/app/components/information-container/InformationContainer'
import { Timer } from './Timer'
import { useState } from 'react'
import { CurrentLevelInfosModel } from '@/app/models/LevelInfos.model'

export default function TimeRemaining({
  levelInfos,
}: {
  levelInfos: CurrentLevelInfosModel
}) {
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
            <Text>
              {levelInfos.smallBlindValue} /{levelInfos.bingBlindValue} /
              {levelInfos.anteValue}
            </Text>
          </Box>
          <Box className={styles.InfoZone}>
            <Text className={styles.InfoText}>BTN : </Text>
            <Text>{levelInfos.btn}</Text>
          </Box>
        </Box>
        <Box className={styles.PotTotal}>
          <Text>Pot Total :</Text>
          <Text className={styles.Total}> {levelInfos.totalPot}</Text>
        </Box>
      </Box>
    </InformationContainer>
  )
}
