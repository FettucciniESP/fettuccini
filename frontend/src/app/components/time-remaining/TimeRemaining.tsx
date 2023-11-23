import { Box, Text } from '@chakra-ui/react'
import styles from './TimeRemaining.module.scss'
import InformationContainer from '@/app/components/information-container/InformationContainer'
import { Timer } from './timer/Timer'
import { LevelInfosModel } from '@/app/models/LevelInfos.model'
import useTimeRemaining from '@/app/components/time-remaining/useTimeRemaining'

export default function TimeRemaining({
  currentLevelInfos,
  roundLevelInfo,
}: {
  currentLevelInfos: LevelInfosModel
  roundLevelInfo: any //TODO
}) {
  const { time, handleTimeUp } = useTimeRemaining()

  return (
    <InformationContainer>
      <Box className={styles.container}>
        <Text>Temps restant : </Text>
        <Timer initialTime={time} onTimeUp={handleTimeUp} />
        <Box>
          <Box className={styles.infoZone}>
            <Text className={styles.infoText}>
              small blind / big blind / ante :
            </Text>
            <Text>
              {currentLevelInfos.smallBlindValue} /
              {currentLevelInfos.bingBlindValue} /{currentLevelInfos.anteValue}
            </Text>
          </Box>
          <Box className={styles.infoZone}>
            <Text className={styles.infoText}>BTN : </Text>
            <Text>{roundLevelInfo.btn}</Text>
          </Box>
        </Box>
        <Box className={styles.potTotal}>
          <Text>Pot Total :</Text>
          <Text className={styles.total}> {roundLevelInfo.totalPot}</Text>
        </Box>
      </Box>
    </InformationContainer>
  )
}
