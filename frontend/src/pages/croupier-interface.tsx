import { ChakraProvider } from '@chakra-ui/react'
import styles from '../app/assets/styles/croupier-interface.module.scss'
import ActionFooter from '@/app/components/action-footer/ActionFooter'
import { PlayerInfosModel } from '@/app/models/PlayerInfos.model'
import InformationPanel from '@/app/components/information-panel/InformationPanel'
import {playersService} from "@/app/services/players.service";
import {useEffect, useState} from "react";
import {NextRouter, useRouter} from "next/router";
import {croupierLoadingService} from "@/app/services/croupier-loading.service";
import {Subscription} from "rxjs";

export default function CroupierInterface() {
  const router: NextRouter = useRouter();
  let [currentPlayerInfo, setCurrentPlayerInfo] = useState<PlayerInfosModel|undefined>(undefined);

  useEffect(() => {
    const currentPlayer_subscribe: Subscription = playersService.currentPlayerInfos$.subscribe((currentPlayer: PlayerInfosModel) => {
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
