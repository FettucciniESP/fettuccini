import { Box, Text } from '@chakra-ui/react'
import styles from './TimeRemaining.module.scss'
import InformationContainer from '@/app/components/information-container/InformationContainer'
import { Timer } from './timer/Timer'
import { LevelInfosModel } from '@/app/models/LevelInfos.model'
import {RoundInfosModel} from "@/app/models/RoundInfos.model";

export default function TimeRemaining({
  currentLevelInfos,
  roundInfos,
}: {
  currentLevelInfos: LevelInfosModel
  roundInfos: RoundInfosModel
}) {

  return (
    <InformationContainer>
      <Box className={styles.container}>
        <Text>Temps restant : </Text>
        <Timer />
        <Box>
          <Box className={styles.infoZone}>
            <Text className={styles.infoText}>
              Small Blind / Big Blind / Ante :
            </Text>
            <Text>
              {currentLevelInfos.smallBlind} /
              {currentLevelInfos.bigBlind} /{currentLevelInfos.ante}
            </Text>
          </Box>
          <Box className={styles.infoZone}>
            <Text className={styles.infoText}>BTN : </Text>
            <Text>{roundInfos.currentButtonUser.name}</Text>
          </Box>
        </Box>
        <Box className={styles.potTotal}>
          <Text>Pot Total :</Text>
          <Text className={styles.total}>{roundInfos.currentPotAmount}</Text>
        </Box>
      </Box>
    </InformationContainer>
  )
}
