import { ChakraProvider } from '@chakra-ui/react'
import styles from '../app/assets/styles/croupier-interface.module.scss'
import { PlayerInfosModel } from '@/app/models/PlayerInfos.model'
import InformationPanel from '@/app/components/information-panel/InformationPanel'
import {playersService} from "@/app/services/players.service";
import {useEffect, useState} from "react";
import {NextRouter, useRouter} from "next/router";
import {croupierLoadingService} from "@/app/services/croupier-loading.service";
import {Subscription} from "rxjs";

export default function CroupierInterface() {
  const router: NextRouter = useRouter();

  useEffect(() => {
    if (!croupierLoadingService.getSessionId()){
      router.push('/home');
    }
  }, []);
  
  return (
    <ChakraProvider>
      <main className={styles.main}>
        <InformationPanel />
      </main>
    </ChakraProvider>
  )
}
