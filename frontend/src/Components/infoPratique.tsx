import { Level } from '@/app/models/level'
import { Box } from '@chakra-ui/react'
import { Text, Stack } from '@chakra-ui/react'

export default function InfoPratique(infolevel: Level) {
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
        <Text>{infolevel.nextLevel}</Text>
      </Stack>
      {/* Blinds */}
      <Stack spacing={2} direction="row" paddingBlock={20}>
        <Text as={'b'}>small Blind / Big blind / ante : </Text>
        <Text>{infolevel.sb} / {infolevel.bb} / {infolevel.ante}</Text>
      </Stack>
      {/* Temps du niveau */}
      <Stack spacing={2} direction="row">
        <Text as={'b'}>Temps du niveau : </Text>
        <Text>{infolevel.time} minutes </Text>
      </Stack>
    </Box>
  )
}
