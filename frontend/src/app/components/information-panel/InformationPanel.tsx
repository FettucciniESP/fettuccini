import { Box, Text } from '@chakra-ui/react'
import styles from './InformationPanel.module.scss'
import NextLevelInfos from '../next-level-infos/NextLevelInfos'
import PlayersStatus from '../players-status/PlayersStatus'
import {
  CurrentLevelInfosModel,
  NextLevelInfosModel,
} from '@/app/models/LevelInfos.model'
import { PlayerHandInfosModel } from '@/app/models/PlayerHandInfos.model'
import { GameActionEnum } from '@/app/enums/GameAction.enum'
import TimeRemaining from '../time-remaining/TimeRemaining'

export default function InformationPanel() {
  const mockNextLevelInfos: NextLevelInfosModel = {
    index: 1,
    smallBlindValue: 10,
    bingBlindValue: 20,
    anteValue: 0,
    time: 10,
  }
  const mockPlayersHandInfos: PlayerHandInfosModel[] = [
    {
      seat: 1,
      lastAction: GameActionEnum.BET,
      betValue: 100,
      betIsValid: true,
    },
    {
      seat: 2,
      lastAction: GameActionEnum.CHECK,
      betValue: 0,
      betIsValid: true,
    },
    {
      seat: 3,
      lastAction: GameActionEnum.FOLD,
      betValue: 0,
      betIsValid: true,
    },
  ]

  const mockCurrentLevelInfo: CurrentLevelInfosModel = {
    smallBlindValue: 10,
    bingBlindValue: 20,
    anteValue: 30,
    btn: 3,
    totalPot: 100000,
  }

  return (
    <Box className={styles.informationPanel}>
      <Box className={styles.leftInformationPanel}></Box>
      <Box className={styles.middleInformationPanel}>
        <TimeRemaining levelInfos={mockCurrentLevelInfo} />
        <NextLevelInfos levelInfos={mockNextLevelInfos} />
      </Box>
      <Box className={styles.rightInformationPanel}>
        <PlayersStatus playersHandInfos={mockPlayersHandInfos} />
      </Box>
    </Box>
  )
}
