import { Box, useToast, UseToastOptions } from "@chakra-ui/react";
import styles from "./InformationPanel.module.scss";
import { LevelInfosModel } from "@/app/models/LevelInfos.model";
import { PlayerHandInfosModel } from "@/app/models/PlayerHandInfos.model";
import { RoundInfosModel } from "@/app/models/RoundInfos.model";
import { levelsService } from "@/app/services/levels.service";
import { playersService } from "@/app/services/players.service";
import { roundService } from "@/app/services/round.service";
import { toastService } from "@/app/services/toast.service";
import { useEffect, useState } from "react";
import { Subscription } from "rxjs";
import PlayerSeatInformations from "@/app/components/information-panel/player-seat-informations/PlayerSeatInformations";
import GameInformations from "@/app/components/information-panel/game-informations/GameInformations";
import BlindsInformations from "@/app/components/information-panel/blinds-informations/BlindsInformations";

export default function InformationPanel() {

  let [currentLevelInfos, setCurrentLevelInfos] = useState<
    LevelInfosModel | undefined
  >(undefined);
  let [nextLevelInfos, setNextLevelInfos] = useState<
    LevelInfosModel | undefined
  >(undefined);
  let [playersHandInfos, setPlayersHandInfos] = useState<
    PlayerHandInfosModel[]
  >([]);
  let [roundInfos, setRoundInfos] = useState<RoundInfosModel>();

  useEffect(() => {
    const currentLevel_subscribe: Subscription =
      levelsService.currentLevel$.subscribe((currentLevel: LevelInfosModel) => {
        setCurrentLevelInfos(currentLevel);
      });
    const nextLevel_subscribe: Subscription =
      levelsService.nextLevel$.subscribe((nextLevelInfos: LevelInfosModel) => {
        setNextLevelInfos(nextLevelInfos);
      });
    const playersHandInfos_subscribe: Subscription =
      playersService.playersHandInfos$.subscribe(
        (playersHand: PlayerHandInfosModel[]) => {
          setPlayersHandInfos(playersHand);
        }
      );
    const roundInfos_subscribe: Subscription =
      roundService.roundInfos$.subscribe(
        (roundInfos: RoundInfosModel | undefined) => {
          setRoundInfos(roundInfos);
        }
      );

    return () => {
      currentLevel_subscribe.unsubscribe();
      nextLevel_subscribe.unsubscribe();
      playersHandInfos_subscribe.unsubscribe();
      roundInfos_subscribe.unsubscribe();
    };
  }, []);

  return (
    <Box className={styles.informationPanel}>
      <Box className={styles.leftInformationPanel}>
        {playersHandInfos[1] && roundInfos && (
          <PlayerSeatInformations
            seatIndex={2}
            playerHandInfos={playersHandInfos[1]}
            buttonSeatIndex={roundInfos?.currentButtonUser.seatIndex!}
            currentPlayerSeatIndex={roundInfos?.currentPlayingUser.seatIndex!}
          ></PlayerSeatInformations>
        )}
        {playersHandInfos[0] && roundInfos && (
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
            {playersHandInfos[2] && roundInfos && (
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
            {playersHandInfos[3] && roundInfos && (
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
        {playersHandInfos[4] && roundInfos && (
          <PlayerSeatInformations
            seatIndex={5}
            playerHandInfos={playersHandInfos[4]}
            buttonSeatIndex={roundInfos?.currentButtonUser.seatIndex!}
            currentPlayerSeatIndex={roundInfos?.currentPlayingUser.seatIndex!}
          ></PlayerSeatInformations>
        )}
        {playersHandInfos[5] && roundInfos && (
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
