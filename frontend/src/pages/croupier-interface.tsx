import { ChakraProvider } from '@chakra-ui/react'
import styles from '../app/assets/styles/croupier-interface.module.scss'
import ActionFooter from '@/app/components/action-footer/ActionFooter'
import { PlayerInfosModel } from '@/app/models/PlayerInfos.model'
import { LevelInfosModel } from '@/app/models/LevelInfos.model'
import InformationPanel from '@/app/components/information-panel/InformationPanel'

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

  return (
    <ChakraProvider>
      <main className={styles.main}>
        <InformationPanel />
        <ActionFooter playerInfos={mockPlayerInfos} />
      </main>
    </ChakraProvider>
  )
}
