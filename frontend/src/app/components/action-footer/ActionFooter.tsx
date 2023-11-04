import { Box, Button, Stack } from '@chakra-ui/react'
import imageJeton from '@/app/assets/images/jeton_poker_v3_Blanc.png'
import Image from 'next/image'
import { PlayerInfosModel } from '@/app/models/PlayerInfos.model'
import styles from './ActionFooter.module.scss'

export default function ActionFooter({ playerInfos }: { playerInfos: PlayerInfosModel }) {
  return (
      <Box className={styles.actionFooter}>
        <Box className={styles.footerContent}>
          <Box className={styles.titleBox}>
            <Box className={styles.title}>
              Action siege {playerInfos.index}
            </Box>
            {playerInfos && (
              <Box className={styles.playerInfos}
              >
                <Box className={styles.playerStack}>
                  {playerInfos.stack}
                </Box>
                <Image
                  src={imageJeton}
                  alt="Jeton"
                  style={{ width: '24px', height: 'auto' }}
                />
              </Box>
            )}
          </Box>

          <Stack direction="row" className={styles.buttonStack}>
            <Button className={styles.button}>
              FOLD
            </Button>
            <Button className={styles.button}>
              CHECK / CALL
            </Button>
            <Button className={styles.button}>
              BET
            </Button>
            <Button className={styles.button}>
              ALL-IN
            </Button>
          </Stack>
        </Box>
      </Box>
  )
}
