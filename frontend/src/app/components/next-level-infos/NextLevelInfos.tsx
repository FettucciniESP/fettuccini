import { Box, Text, Stack } from '@chakra-ui/react';
import styles from './NextLevelInfos.module.scss';
import {LevelInfosModel} from "@/app/models/LevelInfos.model";

export default function NextLevelInfos({ levelInfos }: { levelInfos: LevelInfosModel }) {
  return (
      <Box className={styles.container}>
        <Stack spacing={2} direction="row" className={styles.stack}>
          <Text as={'b'} className={styles.bold}>Niveau suivant : </Text>
          <Text>{levelInfos.index}</Text>
        </Stack>
        <Stack spacing={2} direction="row" paddingBlock={20} className={`${styles.stack} ${styles.paddingBlock}`}>
          <Text as={'b'} className={styles.bold}>small Blind / Big blind / ante : </Text>
          <Text>
            {levelInfos.smallBlindValue} / {levelInfos.bingBlindValue} /{' '}
            {levelInfos.anteValue}
          </Text>
        </Stack>
        <Stack spacing={2} direction="row" className={styles.stack}>
          <Text as={'b'} className={styles.bold}>Temps du niveau : </Text>
          <Text>{levelInfos.time} minutes </Text>
        </Stack>
      </Box>
  );
}
