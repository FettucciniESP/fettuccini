import { ChakraProvider } from '@chakra-ui/react'
import styles from '../app/assets/styles/croupier-interface.module.scss'
import PlayersStatus from '@/app/components/players-status/PlayersStatus'
import ActionFooter from '@/app/components/action-footer/ActionFooter'
import HandHistory from '@/app/components/hand-history/HandHistory'
import { HandHistoryModel } from '@/app/models/HandHistory.model'
import { PlayerInfosModel } from '@/app/models/PlayerInfos.model'
import { PlayerHandInfosModel } from '@/app/models/PlayerHandInfos.model'
import { GameActionEnum } from '@/app/enums/GameAction.enum'
import { LevelInfosModel } from '@/app/models/LevelInfos.model'
import NextLevelInfos from '@/app/components/next-level-infos/NextLevelInfos'

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
  const mockHandHistory: HandHistoryModel[] = [
    {
      siege: 3,
      action: GameActionEnum.FOLD,
      betValue: 0,
    },
    {
      siege: 4,
      action: GameActionEnum.BET,
      betValue: 400,
    },
    {
      siege: 6,
      action: GameActionEnum.CHECK,
      betValue: 400,
    },
    {
      siege: 1,
      action: GameActionEnum.CHECK,
      betValue: 400,
    },
    {
      siege: 2,
      action: GameActionEnum.CHECK,
      betValue: 400,
    },
  ]
  return (
    <ChakraProvider>
      <main className={styles.main}>
        <PlayersStatus playersHandInfos={mockPlayersHandInfos} />
        <HandHistory HandHistoryInfos={mockHandHistory} />
      </main>
    </ChakraProvider>
  )
}
