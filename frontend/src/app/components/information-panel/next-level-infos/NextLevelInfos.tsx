import { Box, Text } from '@chakra-ui/react'
import styles from './NextLevelInfos.module.scss'
import { LevelInfosModel } from '@/app/models/LevelInfos.model'
import InformationContainer from '@/app/components/information-container/InformationContainer'

export default function NextLevelInfos({
  levelInfos,
}: {
  levelInfos: LevelInfosModel
}) {
  return (
    <InformationContainer>
      <Box className={styles.container}>
        <Box className={styles.stack}>
          <Text as={'b'} className={styles.bold}>
            Niveau suivant :
          </Text>
          <Text>{levelInfos.levelIndex}</Text>
        </Box>
        <Box className={`${styles.stack} ${styles.paddingBlock}`}>
          <Text as={'b'} className={styles.bold}>
            Small Blind / Big Blind / Ante :
          </Text>
          <Text>
            {levelInfos.smallBlind} / {levelInfos.bigBlind} /
            {levelInfos.ante}
          </Text>
        </Box>
        <Box className={styles.stack}>
          <Text as={'b'} className={styles.bold}>
            Temps du niveau :
          </Text>
          <Text>{levelInfos.duration} minutes </Text>
        </Box>
      </Box>
    </InformationContainer>
  )
}
