import { Box, Text } from '@chakra-ui/react'
import styles from './TimeRemaining.module.scss'
import InformationContainer from '@/app/components/information-container/InformationContainer'
import { Timer } from './timer/Timer'
import { CurrentLevelInfosModel } from '@/app/models/LevelInfos.model'
import useTimeRemaining from "@/app/components/time-remaining/useTimeRemaining";

export default function TimeRemaining({
  currentLevelInfos,
}: {
  currentLevelInfos: CurrentLevelInfosModel
}) {

  const { time, handleTimeUp } = useTimeRemaining();

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
              {currentLevelInfos.smallBlindValue} /{currentLevelInfos.bingBlindValue} /
              {currentLevelInfos.anteValue}
            </Text>
          </Box>
          <Box className={styles.infoZone}>
            <Text className={styles.infoText}>BTN : </Text>
            <Text>{currentLevelInfos.btn}</Text>
          </Box>
        </Box>
        <Box className={styles.potTotal}>
          <Text>Pot Total :</Text>
          <Text className={styles.total}> {currentLevelInfos.totalPot}</Text>
        </Box>
      </Box>
    </InformationContainer>
  )
}