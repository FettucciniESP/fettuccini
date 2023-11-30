import { ChakraProvider } from '@chakra-ui/react'
import styles from '../app/assets/styles/croupier-interface.module.scss'
import PlayersStatus from '@/app/components/information-panel/players-status/PlayersStatus'
import ActionFooter from '@/app/components/action-footer/ActionFooter'
import { PlayerInfosModel } from '@/app/models/PlayerInfos.model'
import { PlayerHandInfosModel } from '@/app/models/PlayerHandInfos.model'
import { GameActionEnum } from '@/app/enums/GameAction.enum'
import { LevelInfosModel } from '@/app/models/LevelInfos.model'
import NextLevelInfos from '@/app/components/information-panel/next-level-infos/NextLevelInfos'
import InformationPanel from '@/app/components/information-panel/InformationPanel'

export default function CroupierInterface() {
  const mockPlayerInfos: PlayerInfosModel = {
    seatIndex: 1,
    stack: 1000,
  }

  return (
    <ChakraProvider>
      <main className={styles.main}>
        <InformationPanel />
        <ActionFooter playerInfos={mockPlayerInfos} />
      </main>
    </ChakraProvider>
  )
}
