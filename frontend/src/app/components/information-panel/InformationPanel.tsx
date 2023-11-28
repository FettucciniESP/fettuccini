import { Box, Text } from '@chakra-ui/react'
import styles from './InformationPanel.module.scss'
import NextLevelInfos from './next-level-infos/NextLevelInfos'
import PlayersStatus from './players-status/PlayersStatus'
import { LevelInfosModel } from '@/app/models/LevelInfos.model'
import { PlayerHandInfosModel } from '@/app/models/PlayerHandInfos.model'
import HandHistory from '@/app/components/information-panel/hand-history/HandHistory'
import { HandPlayersActionsHistoryModel } from '@/app/models/HandPlayersActionsHistoryModel'
import { GameActionEnum } from '@/app/enums/GameAction.enum'
import LevelIndex from './level-index/LevelIndex'
import TimeRemaining from './time-remaining/TimeRemaining'
import { RoundInfosModel } from '@/app/models/RoundInfos.model'
import { RoundStepEnum } from '@/app/enums/RoundStep.enum'

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
      seatIndex: 1,
      lastAction: GameActionEnum.BET,
      betValue: 100,
      betIsValid: true,
    },
    {
      seatIndex: 2,
      lastAction: GameActionEnum.CHECK,
      betValue: 0,
      betIsValid: true,
    },
    {
      seatIndex: 3,
      lastAction: GameActionEnum.FOLD,
      betValue: 0,
      betIsValid: true,
    },
  ]
  const mockHandHistory: HandPlayersActionsHistoryModel = {
    preflop: [
        {
            seatIndex: 1,
            actionType: GameActionEnum.BET,
            amount: 100,
            roundStep: RoundStepEnum.FLOP
        },
        {
            seatIndex: 2,
            actionType: GameActionEnum.CHECK,
            amount: 0,
            roundStep: RoundStepEnum.FLOP
        },
        {
            seatIndex: 3,
            actionType: GameActionEnum.FOLD,
            amount: 0,
            roundStep: RoundStepEnum.FLOP
        },
    ],
    flop: [
      {
        seatIndex: 1,
        actionType: GameActionEnum.BET,
        amount: 100,
        roundStep: RoundStepEnum.FLOP
      },
      {
        seatIndex: 2,
        actionType: GameActionEnum.CALL,
        amount: 100,
        roundStep: RoundStepEnum.FLOP
      },
    ],
    turn: [
        {
            seatIndex: 1,
            actionType: GameActionEnum.BET,
            amount: 100,
            roundStep: RoundStepEnum.FLOP
        },
        {
            seatIndex: 2,
            actionType: GameActionEnum.FOLD,
            amount: 0,
            roundStep: RoundStepEnum.FLOP
        }
    ],
    river: null,
  }

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
        <HandHistory handHistoryInfos={mockHandHistory} />
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
