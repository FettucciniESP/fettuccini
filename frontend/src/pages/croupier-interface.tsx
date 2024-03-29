import { ChakraProvider, useToast } from '@chakra-ui/react'
import styles from '../app/assets/styles/croupier-interface.module.scss'
import InformationPanel from '@/app/components/information-panel/InformationPanel'
import {useEffect} from "react";
import {NextRouter, useRouter} from "next/router";
import {croupierLoadingService} from "@/app/services/croupier-loading.service";
import { toastService } from '@/app/services/toast.service';
import { Subscription } from 'rxjs';

export default function CroupierInterface() {
  const router: NextRouter = useRouter();
  const toast = useToast();
  const toastOptions = toastService.setToastOptions();

  useEffect(() => {
    if (!croupierLoadingService.getSessionId()){
      router.push('/home');
    }
    const errorValue_subscribe: Subscription =
      toastService.errorValue$.subscribe((errorValue: String | undefined) => {
        if (!!errorValue && !!toastOptions) {
          toast({
            title: errorValue,
            ...toastOptions,
          });
        }
      });
      return () => {
        errorValue_subscribe.unsubscribe();
      };
  }, [router, toast, toastOptions]);

  return (
    <ChakraProvider>
      <main className={styles.main}>
        <InformationPanel />
      </main>
    </ChakraProvider>
  )
}
