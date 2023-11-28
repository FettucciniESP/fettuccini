import { Button, ChakraProvider, Link } from '@chakra-ui/react'
import styles from '../app/assets/styles/home.module.scss'
import { useRouter } from 'next/router'

export default function CroupierInterface() {
  const router = useRouter()

  const handleClick = () => {
    router.push('/croupier-interface')
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
