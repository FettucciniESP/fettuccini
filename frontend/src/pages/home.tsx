import { ChakraProvider, useToast } from "@chakra-ui/react";
import styles from "../app/assets/styles/home.module.scss";
import { NextRouter, useRouter } from "next/router";
import { croupierLoadingService } from "@/app/services/croupier-loading.service";
import { StartGameResponseModel } from "@/app/models/StartGameResponse.model";
import { croupierService } from "@/app/services/croupier.service";
import SettingLobby from "./setting-lobby";
import { toastService } from "@/app/services/toast.service";
import { useEffect } from "react";
import { Subscription } from "rxjs";
export default function CroupierInterface() {
  const toast = useToast();
  const toastOptions = toastService.setToastOptions();

  useEffect(() => {
    const errorValue_subscribe: Subscription =
      toastService.errorValue$.subscribe((errorValue: String | undefined) => {
        console.log("home error")
        console.log(errorValue);
        if (!!errorValue && !!toastOptions) {
          toast({
            title: errorValue,
            ...toastOptions,
          });
        }
      });
      return () => {
        console.log("unsuscribe")
        errorValue_subscribe.unsubscribe();
      };
    }, [toast, toastOptions])



  return (
    <ChakraProvider>
      <main className={styles.main}>
        <SettingLobby />
      </main>
    </ChakraProvider>
  );
};