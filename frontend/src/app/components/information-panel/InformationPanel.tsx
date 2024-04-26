import { Box } from "@chakra-ui/react";
import styles from "./InformationPanel.module.scss";
import { LevelInfosModel } from "@/app/models/LevelInfos.model";
import { PlayerHandInfosModel } from "@/app/models/PlayerHandInfos.model";
import { RoundInfosModel } from "@/app/models/RoundInfos.model";
import PlayerSeatInformations from "@/app/components/information-panel/player-seat-informations/PlayerSeatInformations";
import GameInformations from "@/app/components/information-panel/game-informations/GameInformations";
import BlindsInformations from "@/app/components/information-panel/blinds-informations/BlindsInformations";
import {PlayerActionModel} from "@/app/models/PlayerAction.model";
import {PlayerInfosModel} from "@/app/models/PlayerInfos.model";

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

    const playersHandInfosDefault: PlayerHandInfosModel = {
        lastAction: null,
        player: {
            name: "",
            seatIndex: 0,
            balance: 0,
        }
    };

    const searchPlayerSeatIndex = (seatIndex: number) => {
        return playersHandInfos.find(playerHandInfos => playerHandInfos.player.seatIndex === seatIndex) || playersHandInfosDefault;
    }

  return (
    <Box className={styles.informationPanel}>
      <Box className={styles.leftInformationPanel}>
        {roundInfos && (
          <PlayerSeatInformations
            seatIndex={2}
            playerHandInfos={searchPlayerSeatIndex(2)}
            buttonSeatIndex={roundInfos?.currentButtonUser.seatIndex!}
            currentPlayerSeatIndex={roundInfos?.currentPlayingUser.seatIndex!}
          ></PlayerSeatInformations>
        )}
        {roundInfos && (
          <PlayerSeatInformations
            seatIndex={1}
            playerHandInfos={searchPlayerSeatIndex(1)}
            buttonSeatIndex={roundInfos?.currentButtonUser.seatIndex!}
            currentPlayerSeatIndex={roundInfos?.currentPlayingUser.seatIndex!}
          ></PlayerSeatInformations>
        )}
      </Box>
      <Box className={styles.middleInformationPanel}>
        <Box className={styles.playersInformationsContainer}>
          <Box className={styles.playersInformationsCard}>
            {roundInfos && (
              <PlayerSeatInformations
                seatIndex={3}
                playerHandInfos={searchPlayerSeatIndex(3)}
                buttonSeatIndex={roundInfos?.currentButtonUser.seatIndex!}
                currentPlayerSeatIndex={
                  roundInfos?.currentPlayingUser.seatIndex!
                }
              ></PlayerSeatInformations>
            )}
          </Box>
          <Box className={styles.playersInformationsCard}>
            {roundInfos && (
              <PlayerSeatInformations
                seatIndex={4}
                playerHandInfos={searchPlayerSeatIndex(4)}
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
        {roundInfos && (
          <PlayerSeatInformations
            seatIndex={5}
            playerHandInfos={searchPlayerSeatIndex(5)}
            buttonSeatIndex={roundInfos?.currentButtonUser.seatIndex!}
            currentPlayerSeatIndex={roundInfos?.currentPlayingUser.seatIndex!}
          ></PlayerSeatInformations>
        )}
        {roundInfos && (
          <PlayerSeatInformations
            seatIndex={6}
            playerHandInfos={searchPlayerSeatIndex(6)}
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
