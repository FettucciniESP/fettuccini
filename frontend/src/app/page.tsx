import styles from './page.module.css'
import Croupier from '@/View/Croupier/Croupier'

export default function Home() {
  return (
    <main className={styles.main}>
      <Croupier />
    </main>
  )
}
