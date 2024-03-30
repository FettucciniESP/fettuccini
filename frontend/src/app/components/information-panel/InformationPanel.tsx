import { Box } from "@chakra-ui/react";
import styles from "./InformationPanel.module.scss";
import { LevelInfosModel } from "@/app/models/LevelInfos.model";
import { PlayerHandInfosModel } from "@/app/models/PlayerHandInfos.model";
import { RoundInfosModel } from "@/app/models/RoundInfos.model";
import PlayerSeatInformations from "@/app/components/information-panel/player-seat-informations/PlayerSeatInformations";
import GameInformations from "@/app/components/information-panel/game-informations/GameInformations";
import BlindsInformations from "@/app/components/information-panel/blinds-informations/BlindsInformations";

export default function InformationPanel({
  playersHandInfos,
  currentLevelInfos,
  nextLevelInfos,
  roundInfos }: {
    playersHandInfos: PlayerHandInfosModel[],
    currentLevelInfos: LevelInfosModel | undefined,
    nextLevelInfos: LevelInfosModel  | undefined,
    roundInfos: RoundInfosModel | undefined,
  }) {
  return (
    <Box className={styles.informationPanel}>
      <Box className={styles.leftInformationPanel}>
        {playersHandInfos && playersHandInfos[1] && roundInfos && (
          <PlayerSeatInformations
            seatIndex={2}
            playerHandInfos={playersHandInfos[1]}
            buttonSeatIndex={roundInfos?.currentButtonUser.seatIndex!}
            currentPlayerSeatIndex={roundInfos?.currentPlayingUser.seatIndex!}
          ></PlayerSeatInformations>
        )}
        {playersHandInfos && playersHandInfos[0] && roundInfos && (
          <PlayerSeatInformations
            seatIndex={1}
            playerHandInfos={playersHandInfos[0]}
            buttonSeatIndex={roundInfos?.currentButtonUser.seatIndex!}
            currentPlayerSeatIndex={roundInfos?.currentPlayingUser.seatIndex!}
          ></PlayerSeatInformations>
        )}
      </Box>
      <Box className={styles.middleInformationPanel}>
        <Box className={styles.playersInformationsContainer}>
          <Box className={styles.playersInformationsCard}>
            {playersHandInfos && playersHandInfos[2] && roundInfos && (
              <PlayerSeatInformations
                seatIndex={3}
                playerHandInfos={playersHandInfos[2]}
                buttonSeatIndex={roundInfos?.currentButtonUser.seatIndex!}
                currentPlayerSeatIndex={
                  roundInfos?.currentPlayingUser.seatIndex!
                }
              ></PlayerSeatInformations>
            )}
          </Box>
          <Box className={styles.playersInformationsCard}>
            {playersHandInfos && playersHandInfos[3] && roundInfos && (
              <PlayerSeatInformations
                seatIndex={4}
                playerHandInfos={playersHandInfos[3]}
                buttonSeatIndex={roundInfos?.currentButtonUser.seatIndex!}
                currentPlayerSeatIndex={
                  roundInfos?.currentPlayingUser.seatIndex!
                }
              ></PlayerSeatInformations>
            )}
          </Box>
        </Box>
        {currentLevelInfos && roundInfos && nextLevelInfos && (
          <GameInformations
            roundInfos={roundInfos}
            currentLevelInfos={currentLevelInfos}
            nextLevelInfos={nextLevelInfos}
          />
        )}
      </Box>
      <Box className={styles.rightInformationPanel}>
        {playersHandInfos && playersHandInfos[4] && roundInfos && (
          <PlayerSeatInformations
            seatIndex={5}
            playerHandInfos={playersHandInfos[4]}
            buttonSeatIndex={roundInfos?.currentButtonUser.seatIndex!}
            currentPlayerSeatIndex={roundInfos?.currentPlayingUser.seatIndex!}
          ></PlayerSeatInformations>
        )}
        {playersHandInfos && playersHandInfos[5] && roundInfos && (
          <PlayerSeatInformations
            seatIndex={6}
            playerHandInfos={playersHandInfos[5]}
            buttonSeatIndex={roundInfos?.currentButtonUser.seatIndex!}
            currentPlayerSeatIndex={roundInfos?.currentPlayingUser.seatIndex!}
          ></PlayerSeatInformations>
        )}
        {currentLevelInfos && (
          <BlindsInformations
            currentLevelInfos={currentLevelInfos}
          ></BlindsInformations>
        )}
      </Box>
    </Box>
  );
}
