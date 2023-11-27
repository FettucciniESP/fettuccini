import { Button, ChakraProvider, Link } from '@chakra-ui/react'
import styles from '../app/assets/styles/home.module.scss'
import { useRouter } from 'next/router'
import croupierLoadingService from "@/app/services/croupier-loading.service";
import {StartGameResponseModel} from "@/app/models/StartGameResponse.model";
import {levelsService} from "@/app/services/levels.service";
import {playersService} from "@/app/services/players.service";
import {roundService} from "@/app/services/roundService";
import {croupierService} from "@/app/services/croupier.service";

export default function CroupierInterface() {
  const router = useRouter()

  const handleClick = () => {
    croupierLoadingService.startNewGame().then((startGameResponse: StartGameResponseModel) => {
      croupierService.getGameInformations(startGameResponse);
      console.log(startGameResponse);
      router.push('/croupier-interface');
    })
  }

  return (
    <ChakraProvider>
      <main className={styles.main}>
        <Button className={styles.btnStart} onClick={handleClick}>
          Lancer une partie
        </Button>
      </main>
    </ChakraProvider>
  )
}
