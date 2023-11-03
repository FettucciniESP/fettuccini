import ActionFooter from '../../components/ActionFooter'
import { PlayerInfos } from '@/app/models/playerInfos'
import { Box } from '@chakra-ui/react'

const playerInfos: PlayerInfos = {
  index: 1,
  stack: 1000,
}

export default function Croupier() {
  return (
    <Box bottom="0" position="absolute" width="100vw">
      <ActionFooter {...playerInfos} />
    </Box>
  )
}
