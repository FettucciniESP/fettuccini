import { Box, Button } from '@chakra-ui/react'
import { PlayerInfosModel } from '@/app/models/PlayerInfos.model'
import styles from './ActionButtons.module.scss'
import useActionButtons from './useActionButtons'
import { GameActionEnum } from '@/app/enums/GameAction.enum'
import { useState } from 'react'
import Calculator from '@/app/components/design-system/calculator-modal/Calculator'
import EndGameModal from "@/app/components/information-panel/end-game-modal/EndGameModal";
import CardMisread from "@/app/components/information-panel/card-miss-read/CardMisread";
import {croupierLoadingService} from "@/app/services/croupier-loading.service";
import {ChipsCountResponseModel} from "@/app/models/ChipsCountResponse.model";

export default function ActionButtons({
  playerInfos,
}: {
  readonly playerInfos: PlayerInfosModel;
}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [initialBetValue, setInitialBetValue] = useState(0);

    const {
        handleActionButtonClick,
        buttonIsDisabled,
        cardsMisreadModal,
        closeCardsMisreadModal,
        actionNeededInfos,
        roundInfos,
        finishRound,
    } = useActionButtons()

    const openModal = () => {
        croupierLoadingService.getChipsCount(playerInfos.seatIndex, roundInfos!.roundId).then((chipsCount: ChipsCountResponseModel) => {
            setInitialBetValue(chipsCount ? chipsCount.chipsCount : 0);
            setIsModalOpen(true);
        });
    }

    const closeModal = () => { 
        setIsModalOpen(false);
    }

    const handleBet = (amount: number) => {
        handleActionButtonClick(playerInfos, GameActionEnum.BET, amount)
    }

    return (
        <Box id={"box"} className={styles.actionButtonsContainer}>
            {isModalOpen && (
                <Calculator openCalculator={isModalOpen} closeCalculator={closeModal} handleNumber={handleBet} initialValue={initialBetValue} />
            )}
            {cardsMisreadModal && (
                <CardMisread isModalOpen={cardsMisreadModal} closeModal={closeCardsMisreadModal} actionNeededInfos={actionNeededInfos!} roundId={roundInfos!.roundId} finishRound={finishRound} />
            )}
            <Box id={"line1"} className={styles.actionButtonsLine}>
                <Button
                    id={"FOLD"}
                    isDisabled={buttonIsDisabled(playerInfos, GameActionEnum.FOLD)}
                    className={styles.button}
                    onClick={() =>
                        handleActionButtonClick(playerInfos, GameActionEnum.FOLD)
                    }
                >
                    FOLD
                </Button>
                <Button
                    id={"CHECK"}
                    isDisabled={buttonIsDisabled(playerInfos, GameActionEnum.CHECK)}
                    className={styles.button}
                    onClick={() =>
                        handleActionButtonClick(playerInfos, GameActionEnum.CHECK)
                    }
                >
                    CHECK / CALL
                </Button>
            </Box>
            <Box id={"line2"} className={styles.actionButtonsLine}>
                <Button
                    id={"BET"}
                    isDisabled={buttonIsDisabled(playerInfos, GameActionEnum.BET)}
                    className={styles.button}
                    onClick={() =>
                        openModal()
                    }
                >
                    BET
                </Button>
                <Button
                    id={"ALL_IN"}
                    className={styles.button}
                    onClick={() =>
                        handleActionButtonClick(playerInfos, GameActionEnum.ALL_IN)
                    }
                >
                    ALL-IN
                </Button>
            </Box>
        </Box>
    )
}
