import { ChakraProvider } from '@chakra-ui/react'
import styles from '../app/assets/styles/croupier-interface.module.scss'
import PlayersStatus from '@/app/components/players-status/PlayersStatus'
import ActionFooter from '@/app/components/action-footer/ActionFooter'
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

  return (
    <ChakraProvider>
      <main className={styles.main}>
        <PlayersStatus playersHandInfos={mockPlayersHandInfos} />
        <NextLevelInfos levelInfos={mockLevelInfos} />
        <ActionFooter playerInfos={mockPlayerInfos} />
      </main>
    </ChakraProvider>
  )
}
