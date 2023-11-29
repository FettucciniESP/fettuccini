import { Box, Button, Stack } from '@chakra-ui/react'
import imgPokerChip from '@/app/assets/images/jeton_poker_v3_Blanc.png'
import Image from 'next/image'
import { PlayerInfosModel } from '@/app/models/PlayerInfos.model'
import styles from './ActionFooter.module.scss'
import useActionFooter from './useActionFooter'
import { GameActionEnum } from '@/app/enums/GameAction.enum'

export default function ActionFooter({
  playerInfos,
}: {
  playerInfos: PlayerInfosModel
}) {
  const { handleActionButtonClick } = useActionFooter()

  return (
    <Box className={styles.actionFooter}>
      <Box className={styles.footerContent}>
        <Box className={styles.titleBox}>
          <Box className={styles.title}>Action {playerInfos.name}</Box>
          {playerInfos && (
            <Box className={styles.playerInfos}>
              <Box className={styles.playerStack}>
                Stack : {playerInfos.balance}
              </Box>
              <Image
                src={imgPokerChip}
                alt="Jeton"
                style={{ width: '24px', height: 'auto' }}
              />
            </Box>
          )}
        </Box>

        <Stack direction="row" className={styles.buttonStack}>
          <Button
            className={styles.button}
            onClick={() =>
              handleActionButtonClick(playerInfos, GameActionEnum.FOLD)
            }
          >
            FOLD
          </Button>
          <Button
            className={styles.button}
            onClick={() =>
              handleActionButtonClick(playerInfos, GameActionEnum.CHECK)
            }
          >
            CHECK / CALL
          </Button>
          <Button
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
        </Stack>
      </Box>
    </Box>
  )
}
