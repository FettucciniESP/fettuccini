import { Button, ChakraProvider, Link } from '@chakra-ui/react'
import styles from '../app/assets/styles/home.module.scss'
import { useRouter } from 'next/router'
import croupierService from "@/app/services/croupier-loading.service";
import {StartGameResponseModel} from "@/app/models/StartGameResponse.model";
import {levelsService} from "@/app/services/levels.service";
import {playersService} from "@/app/services/players.service";

export default function CroupierInterface() {
  const router = useRouter()

  const handleClick = () => {
    croupierService.startNewGame().then((response: StartGameResponseModel) => {
      croupierService.setSessionId(response.playerActionResponse.sessionId);
      levelsService.setCurrentLevel(response.levelsStructure.levels[0])
      levelsService.setNextLevel(response.levelsStructure.levels[1])
      playersService.setCurrentPlayerInfos(response.playerActionResponse.currentPlayingUser)
      playersService.setPlayersHandInfos(response.players)
      console.log(response);
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
