import { Box, Button } from '@chakra-ui/react'
import { PlayerInfosModel } from '@/app/models/PlayerInfos.model'
import styles from './ActionButtons.module.scss'
import useActionButtons from './useActionButtons'
import { GameActionEnum } from '@/app/enums/GameAction.enum'
import { useState } from 'react'
import Calculator from '@/app/components/calculator-modal/Calculator'

export default function ActionButtons({
  playerInfos,
}: {
  readonly playerInfos: PlayerInfosModel;
}) {
    let [showCalculatorModal, setShowCalculatorModal] = useState(false);
    const {
        handleActionButtonClick,
        buttonIsDisabled,
    } = useActionButtons()

    return (
        <Box className={styles.actionButtonsContainer}>
            {showCalculatorModal && (
                <Calculator openCalculator={showCalculatorModal} handleActionButtonClick={(amount: number) => handleActionButtonClick(playerInfos, GameActionEnum.BET, amount)} />
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
                        setShowCalculatorModal(true)
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
