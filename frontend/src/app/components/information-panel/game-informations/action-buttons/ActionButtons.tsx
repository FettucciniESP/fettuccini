import { Box, Button } from "@chakra-ui/react";
import { PlayerInfosModel } from "@/app/models/PlayerInfos.model";
import styles from "./ActionButtons.module.scss";
import useActionButtons from "./useActionButtons";
import { GameActionEnum } from "@/app/enums/GameAction.enum";

export default function ActionButtons({
  playerInfos,
}: {
  readonly playerInfos: PlayerInfosModel;
}) {
  const { handleActionButtonClick, buttonIsDisabled } = useActionButtons();

  return (
    <Box className={styles.actionButtonsContainer}>
      <Box className={styles.actionButtonsLine}>
        <Button
          isDisabled={buttonIsDisabled(playerInfos, GameActionEnum.FOLD)}
          className={styles.button}
          onClick={() =>
            handleActionButtonClick(playerInfos, GameActionEnum.FOLD)
          }
        >
          FOLD
        </Button>
        <Button
          isDisabled={buttonIsDisabled(playerInfos, GameActionEnum.CHECK)}
          className={styles.button}
          onClick={() =>
            handleActionButtonClick(playerInfos, GameActionEnum.CHECK)
          }
        >
          CHECK / CALL
        </Button>
      </Box>
      <Box className={styles.actionButtonsLine}>
        <Button
          isDisabled={buttonIsDisabled(playerInfos, GameActionEnum.BET)}
          className={styles.button}
          onClick={() =>
            handleActionButtonClick(playerInfos, GameActionEnum.BET)
          }
        >
          BET
        </Button>
        <Button
          className={styles.button}
          onClick={() =>
            handleActionButtonClick(playerInfos, GameActionEnum.ALL_IN)
          }
        >
          ALL-IN
        </Button>
      </Box>
    </Box>
  );
}
