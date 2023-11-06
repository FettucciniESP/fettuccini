import { Box, Text } from '@chakra-ui/react';
import styles from './InformationContainer.module.scss';

export default function InformationContainer({ children }: { children: React.ReactNode }) {
  return (
      <Box className={styles.container}>
          {children}
      </Box>
  );
}
