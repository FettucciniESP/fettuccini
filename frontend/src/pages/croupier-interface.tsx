import { Box, ChakraProvider, SimpleGrid } from '@chakra-ui/react'
import styles from '../app/assets/styles/croupier-interface.module.scss'
import PlayersStatus from '@/app/components/players-status/PlayersStatus'
import ActionFooter from '@/app/components/action-footer/ActionFooter'
import { PlayerInfosModel } from '@/app/models/PlayerInfos.model'
import { PlayerHandInfosModel } from '@/app/models/PlayerHandInfos.model'
import { GameActionEnum } from '@/app/enums/GameAction.enum'
import { LevelInfosModel } from '@/app/models/LevelInfos.model'
import NextLevelInfos from '@/app/components/next-level-infos/NextLevelInfos'
import InformationPanel from '@/app/components/information-panel/InformationPanel'
import HandHistory from '@/app/components/hand-history/HandHistory'
import { HandHistoryModel } from '@/app/models/HandHistory.model'

export default function CroupierInterface() {
  const mockPlayerInfos: PlayerInfosModel = {
    index: 1,
    stack: 1000,
  }
  const mockLevelInfos: LevelInfosModel = {
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
  const mockHandHistory: HandHistoryModel[] = [
    {
      seat: 3,
      action: GameActionEnum.CHECK,
      betValue: 0,
    },
    {
      seat: 4,
      action: GameActionEnum.BET,
      betValue: 300,
    },
    {
      seat: 6,
      action: GameActionEnum.CALL,
      betValue: 300,
    },
    {
      seat: 1,
      action: GameActionEnum.FOLD,
      betValue: 0,
    },
    {
      seat: 2,
      action: GameActionEnum.CALL,
      betValue: 300,
    },
  ]
  return (
    <ChakraProvider>
      <main className={styles.main}>
        <InformationPanel />
        <HandHistory HandHistoryInfos={mockHandHistory} />
        <ActionFooter playerInfos={mockPlayerInfos} />
      </main>
    </ChakraProvider>
  )
}
