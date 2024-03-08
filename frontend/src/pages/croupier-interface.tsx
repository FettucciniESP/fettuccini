import { ChakraProvider } from '@chakra-ui/react'
import styles from '../app/assets/styles/croupier-interface.module.scss'
import InformationPanel from '@/app/components/information-panel/InformationPanel'
import {useEffect} from "react";
import {NextRouter, useRouter} from "next/router";
import {croupierLoadingService} from "@/app/services/croupier-loading.service";

export default function CroupierInterface() {
  const router: NextRouter = useRouter();

  useEffect(() => {
    if (!croupierLoadingService.getSessionId()){
      router.push('/home');
    }
  }, [router]);

  return (
    <ChakraProvider>
      <main className={styles.main}>
        <InformationPanel />
      </main>
    </ChakraProvider>
  )
}
