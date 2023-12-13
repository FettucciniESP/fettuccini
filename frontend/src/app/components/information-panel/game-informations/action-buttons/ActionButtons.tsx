import {Box, Button, Stack} from '@chakra-ui/react'
import imgPokerChip from '@/app/assets/images/jeton_poker_v3_Blanc.png'
import Image from 'next/image'
import {PlayerInfosModel} from '@/app/models/PlayerInfos.model'
import styles from './ActionButtons.module.scss'
import useActionButtons from './useActionButtons'
import {GameActionEnum} from '@/app/enums/GameAction.enum'

export default function ActionButtons({
                                         playerInfos,
                                     }: {
    playerInfos: PlayerInfosModel
}) {
    const {
        handleActionButtonClick,
        buttonBetIsDisabled,
        buttonFoldIsDisabled,
        buttonCheckCallIsDisabled
    } = useActionButtons()

    return (
        <Box className={styles.actionButtonsContainer}>
            <Box className={styles.actionButtonsLine}>
                <Button
                    isDisabled={buttonFoldIsDisabled(playerInfos)}
                    className={styles.button}
                    onClick={() =>
                        handleActionButtonClick(playerInfos, GameActionEnum.FOLD)
                    }
                >
                    FOLD
                </Button>
                <Button
                    isDisabled={buttonCheckCallIsDisabled(playerInfos)}
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
                    isDisabled={buttonBetIsDisabled(playerInfos)}
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
    )
}
