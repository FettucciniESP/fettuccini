import { Box } from '@chakra-ui/react'
import { Text, Stack } from '@chakra-ui/react'
import { validateHeaderName } from 'http'
import { type } from 'os'

const val = {
  NiveauSUivant: '5',
  Blind: '50 / 100 / 150',
  tempsNiveau: '25',
}

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
        <Text>{val.NiveauSUivant}</Text>
      </Stack>
      {/* Blinds */}
      <Stack spacing={2} direction="row" paddingBlock={20}>
        <Text as={'b'}>Big Blind / small blind / ante : </Text>
        <Text>{val.Blind}</Text>
      </Stack>
      {/* Temps du niveau */}
      <Stack spacing={2} direction="row">
        <Text as={'b'}>Temps du niveau : </Text>
        <Text>{val.tempsNiveau} minutes </Text>
      </Stack>
    </Box>
  )
}
