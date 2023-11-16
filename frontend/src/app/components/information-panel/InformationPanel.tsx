import { Box, Text } from '@chakra-ui/react'
import styles from './InformationPanel.module.scss'
import NextLevelInfos from '../next-level-infos/NextLevelInfos'
import PlayersStatus from '../players-status/PlayersStatus'
import { LevelInfosModel } from '@/app/models/LevelInfos.model'
import { PlayerHandInfosModel } from '@/app/models/PlayerHandInfos.model'
import { GameActionEnum } from '@/app/enums/GameAction.enum'

export default function InformationPanel() {
  const mockLevelInfos: LevelInfosModel = {
    index: 1,
    smallBlindValue: 10,
    bingBlindValue: 20,
    anteValue: 0,
    time: 10,
  }
  const mockPlayersHandInfos: PlayerHandInfosModel[] = [
    {
      siege: 1,
      lastAction: GameActionEnum.BET,
      betValue: 100,
      betIsValid: true,
    },
    {
      siege: 2,
      lastAction: GameActionEnum.CHECK,
      betValue: 0,
      betIsValid: true,
    },
    {
      siege: 3,
      lastAction: GameActionEnum.FOLD,
      betValue: 0,
      betIsValid: true,
    },
  ]

  return (
    <Box className={styles.informationPanel}>
      <Box className={styles.leftInformationPanel}></Box>
      <Box className={styles.middleInformationPanel}>
        <NextLevelInfos levelInfos={mockLevelInfos} />
      </Box>
      <Box className={styles.rightInformationPanel}>
        <PlayersStatus playersHandInfos={mockPlayersHandInfos} />
      </Box>
    </Box>
  )
}