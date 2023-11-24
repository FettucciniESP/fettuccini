import { Box, Text } from '@chakra-ui/react'
import styles from './InformationPanel.module.scss'
import NextLevelInfos from '../next-level-infos/NextLevelInfos'
import PlayersStatus from '../players-status/PlayersStatus'
import { LevelInfosModel } from '@/app/models/LevelInfos.model'
import { PlayerHandInfosModel } from '@/app/models/PlayerHandInfos.model'
import HandHistory from '@/app/components/hand-history/HandHistory'
import { HandHistoryModel } from '@/app/models/HandHistory.model'
import { GameActionEnum } from '@/app/enums/GameAction.enum'
import LevelIndex from '../level-index/LevelIndex'
import TimeRemaining from '../time-remaining/TimeRemaining'
import { RoundInfosModel } from '@/app/models/RoundInfos.model'
import { BoardInfosModel } from '@/app/models/BoardInfos.model'

export default function InformationPanel() {
  const mockCurrentLevelInfos: LevelInfosModel = {
    index: 1,
    smallBlindValue: 5,
    bingBlindValue: 10,
    anteValue: 0,
    duration: 10,
  }
  const mockNextLevelInfos: LevelInfosModel = {
    index: 2,
    smallBlindValue: 10,
    bingBlindValue: 20,
    anteValue: 0,
    duration: 10,
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
  const mockHandHistory: HandHistoryModel[] = [
    {
      seat: 0,
      action: GameActionEnum.NOTHING,
      betValue: 0,
      cardStatus: 'PRE-FLOP',
    },
    {
      seat: 3,
      action: GameActionEnum.CHECK,
      betValue: 0,
      cardStatus: '',
    },
    {
      seat: 4,
      action: GameActionEnum.BET,
      betValue: 300,
      cardStatus: '',
    },
    {
      seat: 6,
      action: GameActionEnum.CALL,
      betValue: 300,
      cardStatus: '',
    },
    {
      seat: 1,
      action: GameActionEnum.FOLD,
      betValue: 0,
      cardStatus: '',
    },
    {
      seat: 2,
      action: GameActionEnum.CALL,
      betValue: 300,
      cardStatus: '',
    },
    {
      seat: 3,
      action: GameActionEnum.CHECK,
      betValue: 0,
      cardStatus: '',
    },
    {
      seat: 4,
      action: GameActionEnum.BET,
      betValue: 300,
      cardStatus: '',
    },
    {
      seat: 6,
      action: GameActionEnum.CALL,
      betValue: 300,
      cardStatus: '',
    },
    {
      seat: 1,
      action: GameActionEnum.FOLD,
      betValue: 0,
      cardStatus: '',
    },
    {
      seat: 2,
      action: GameActionEnum.CALL,
      betValue: 300,
      cardStatus: '',
    },
    {
      seat: 0,
      action: GameActionEnum.NOTHING,
      betValue: 0,
      cardStatus: 'FLOP',
    },
    {
      seat: 3,
      action: GameActionEnum.CHECK,
      betValue: 0,
      cardStatus: '',
    },
    {
      seat: 4,
      action: GameActionEnum.BET,
      betValue: 300,
      cardStatus: '',
    },
    {
      seat: 6,
      action: GameActionEnum.CALL,
      betValue: 300,
      cardStatus: '',
    },
    {
      seat: 1,
      action: GameActionEnum.FOLD,
      betValue: 0,
      cardStatus: '',
    },
    {
      seat: 2,
      action: GameActionEnum.CALL,
      betValue: 300,
      cardStatus: '',
    },
  ]

  const mockRoundLInfos: RoundInfosModel = {
    id: 1,
    gameId: 'string',
    roundIndex: 1,
    actions: [],
    board: [],
    buttonSeatIndex: 1,
    potAmount: 10000,
  }
  return (
    <Box className={styles.informationPanel}>
      <Box className={styles.leftInformationPanel}>
        <LevelIndex levelInfos={mockCurrentLevelInfos} />
        <HandHistory HandHistoryInfos={mockHandHistory} />
      </Box>
      <Box className={styles.middleInformationPanel}>
        <TimeRemaining
          currentLevelInfos={mockCurrentLevelInfos}
          roundInfos={mockRoundLInfos}
        />
        <NextLevelInfos levelInfos={mockNextLevelInfos} />
      </Box>
      <Box className={styles.rightInformationPanel}>
        <PlayersStatus playersHandInfos={mockPlayersHandInfos} />
      </Box>
    </Box>
  )
}
