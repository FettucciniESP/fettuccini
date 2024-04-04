import { Box, Button } from '@chakra-ui/react'
import { PlayerInfosModel } from '@/app/models/PlayerInfos.model'
import styles from './ActionButtons.module.scss'
import useActionButtons from './useActionButtons'
import { GameActionEnum } from '@/app/enums/GameAction.enum'
import { useState } from 'react'
import Calculator from '@/app/components/design-system/calculator-modal/Calculator'
import EndGameModal from "@/app/components/information-panel/end-game-modal/EndGameModal";
import CardMissRead from "@/app/components/information-panel/card-miss-read/CardMissRead";

export default function ActionButtons({
  playerInfos,
}: {
  readonly playerInfos: PlayerInfosModel;
}) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {
        handleActionButtonClick,
        buttonIsDisabled,
    } = useActionButtons()

    const openModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => { 
        setIsModalOpen(false);
    }

    const handleBet = (amount: number) => {
        handleActionButtonClick(playerInfos, GameActionEnum.BET, amount)
    }

    return (
        <Box className={styles.actionButtonsContainer}>
            {isModalOpen && (
                //<CardMissRead isModalOpen={isModalOpen} closeModal={closeModal} playerOrStreetLabel={"Joueur 1"} cardsValues={[null,"9H"]} />
                <Calculator openCalculator={isModalOpen} closeCalculator={closeModal} handleNumber={handleBet} />
            )}
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
                        openModal()
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
    )
}
