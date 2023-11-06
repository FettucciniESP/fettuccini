import { Box, Text } from '@chakra-ui/react';
import { PlayerHandInfosModel } from "@/app/models/PlayerHandInfos.model";
import styles from './PlayersStatus.module.scss';
import usePlayersStatus from './usePlayersStatus';
import InformationContainer from "@/app/components/information-container/InformationContainer";

export default function PlayersStatus({ playersHandInfos }: { playersHandInfos: PlayerHandInfosModel[] }) {
  const { getActionIcon } = usePlayersStatus(playersHandInfos);

  return (
      <InformationContainer >
        <Box className={styles.header}>
          <Text as={'b'} fontSize={22}>
            Joueurs
          </Text>
        </Box>
        <Box className={styles.playerList}>
          {playersHandInfos.map((value, index) => (
              <Box key={index} className={styles.playerItem}>
                <Text>Siège {value.siege}</Text>
                <Text paddingInline={20}>
                  {getActionIcon(value.lastAction)}
                </Text>
                <Text> {value.lastAction}</Text>
              </Box>
          ))}
        </Box>
      </InformationContainer>
  );
}
