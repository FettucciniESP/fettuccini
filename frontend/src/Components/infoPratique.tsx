import { Box } from '@chakra-ui/react'
import { Text, Stack } from '@chakra-ui/react'

export default function InfoPratique() {
  return (
    <Box
      w={'26%'}
      paddingInline={15}
      paddingBlock={30}
      bg="#F7F0E1"
      borderRadius={5}
    >
      {/* Niveau suivant */}
      <Stack spacing={2} direction="row">
        <Text as={'b'}>Niveau suivant : </Text>
        <Text>5 </Text>
      </Stack>
      {/* Blinds */}
      <Stack spacing={2} direction="row" paddingBlock={20}>
        <Text as={'b'}>Big Blind / small blind / ante : </Text>
        <Text>50 / 100 / 150 </Text>
      </Stack>
      {/* Temps du niveau */}
      <Stack spacing={2} direction="row">
        <Text as={'b'}>Temps du niveau : </Text>
        <Text>25 minutes </Text>
      </Stack>
    </Box>
  )
}
