import { ChakraProvider } from '@chakra-ui/react'
import styles from './page.module.css'
import Croupier from '@/View/Croupier/Croupier'

export default function Home() {
  return (
    <ChakraProvider>
      <main className={styles.main}>
        <Croupier />
      </main>
    </ChakraProvider>
  )
}
