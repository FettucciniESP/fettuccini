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
import {useEffect, useState} from "react";
import {RoundPlayersActionsHistoryModel} from "@/app/models/RoundPlayersActionsHistoryModel";
import {RoundInfosModel} from "@/app/models/RoundInfos.model";
import {levelsService} from "@/app/services/levels.service";
import {roundService} from "@/app/services/roundService";
import croupierLoadingService from "@/app/services/croupier-loading.service";
import {useRouter} from "next/router";

export default function CroupierInterface() {
  const router = useRouter()
  let [currentPlayerInfo, setCurrentPlayerInfo] = useState<PlayerInfosModel|undefined>(undefined);

  useEffect(() => {
    const currentPlayer_subscribe = playersService.currentPlayerInfos$.subscribe((currentPlayer: PlayerInfosModel) => {
      setCurrentPlayerInfo(currentPlayer);
    });

    if (!croupierLoadingService.getSessionId()){
      router.push('/home');
    }

    return () => {
      currentPlayer_subscribe.unsubscribe();
    }
  }, []);
  return (
    <ChakraProvider>
      <main className={styles.main}>
        <InformationPanel />
        {currentPlayerInfo && <ActionFooter playerInfos={currentPlayerInfo} />}
      </main>
    </ChakraProvider>
  )
}
