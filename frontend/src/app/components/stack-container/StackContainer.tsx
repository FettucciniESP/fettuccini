import { Box } from '@chakra-ui/react'
import styles from './StackContainer.module.scss'

export default function StackContainer({
  children,
}: {
  children: React.ReactNode
}) {
  return <Box className={styles.container}>{children}</Box>
}
