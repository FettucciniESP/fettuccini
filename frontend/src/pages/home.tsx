import { ChakraProvider } from "@chakra-ui/react";
import styles from "../app/assets/styles/home.module.scss";
import { NextRouter, useRouter } from "next/router";
import { croupierLoadingService } from "@/app/services/croupier-loading.service";
import { StartGameResponseModel } from "@/app/models/StartGameResponse.model";
import { croupierService } from "@/app/services/croupier.service";
import SettingLobby from "./setting-lobby";
export default function CroupierInterface() {
  const router: NextRouter = useRouter();

  const handleClick = () => {
    croupierLoadingService
      .startNewGame()
      .then((startGameResponse: StartGameResponseModel) => {
        croupierService.getGameInformations(startGameResponse);
        router.push("/croupier-interface");
      });
  };

  return (
    <ChakraProvider>
      <main className={styles.main}>
        <SettingLobby />
      </main>
    </ChakraProvider>
  );
}
