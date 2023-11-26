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
import {playersService} from "@/app/services/players.service";

export default function CroupierInterface() {
  let currentPlayerInfo: PlayerInfosModel | undefined;

  playersService.currentPlayerInfos$.subscribe((currentPlayer: PlayerInfosModel) => {
    currentPlayerInfo = currentPlayer;
  })
  return (
    <ChakraProvider>
      <main className={styles.main}>
        <InformationPanel />
        <ActionFooter playerInfos={currentPlayerInfo!} />
      </main>
    </ChakraProvider>
  )
}
