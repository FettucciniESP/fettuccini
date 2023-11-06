import { Box, Text } from '@chakra-ui/react';
import styles from './NextLevelInfos.module.scss';
import {LevelInfosModel} from "@/app/models/LevelInfos.model";
import InformationContainer from "@/app/components/information-container/InformationContainer";

export default function NextLevelInfos({ levelInfos }: { levelInfos: LevelInfosModel }) {
  return (
      <InformationContainer >
        <Box className={styles.stack}>
          <Text as={'b'} className={styles.bold}>Niveau suivant : </Text>
          <Text>{levelInfos.index}</Text>
        </Box>
        <Box className={`${styles.stack} ${styles.paddingBlock}`}>
          <Text as={'b'} className={styles.bold}>small Blind / Big blind / ante : </Text>
          <Text>
            {levelInfos.smallBlindValue} / {levelInfos.bingBlindValue} /{' '}
            {levelInfos.anteValue}
          </Text>
        </Box>
        <Box className={styles.stack}>
          <Text as={'b'} className={styles.bold}>Temps du niveau : </Text>
          <Text>{levelInfos.time} minutes </Text>
        </Box>
      </InformationContainer>
  );
}
