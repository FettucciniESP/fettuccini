import { ChakraProvider } from '@chakra-ui/react'
import styles from './page.module.css'
import Croupier from '@/View/Croupier/Croupier'
import PlayerStatus from '@/components/playerStatus'

export default function Home() {
  const playersHandInfos = {
    playersHandInfos: [
      {
        lastAction: 'bet',
        siege: 1,
        betValue: 10,
        betIsValid: 1,
      },
      {
        lastAction: 'bet',
        siege: 1,
        betValue: 10,
        betIsValid: 1,
      },
    ],
  }

  return (
    <ChakraProvider>
      <main className={styles.main}>
        <PlayerStatus {...playersHandInfos} />
        <Croupier />
      </main>
    </ChakraProvider>
  )
}
