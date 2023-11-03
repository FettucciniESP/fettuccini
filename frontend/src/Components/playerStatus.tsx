import { GameAction } from '@/app/Enums/GameAction'
import { PlayersHandInfos } from '@/app/models/playerHandInfos'
import { Box, Text } from '@chakra-ui/react'

export default function PlayerStatus(playersHandInfos: PlayersHandInfos) {
  return (
    <Box
      w={'30%'}
      bg="#F7F0E1"
      borderRadius={5}
      paddingInline={2}
      paddingBlock={2}
    >
      <Box
        h={60}
        bg="gray"
        display="flex"
        borderTopRadius={5}
        alignItems={'center'}
        justifyContent={'center'}
        marginBottom={2}
      >
        <Text as={'b'} fontSize={22}>
          Joueurs
        </Text>
      </Box>
      <Box
        bg="gray"
        display="flex"
        flexDirection={'column'}
        paddingBlock={30}
        borderBottomRadius={5}
        paddingLeft={30}
        h={400}
        maxH={400}
      >
        {playersHandInfos.playersHandInfos.map((value, index) => (
          <Box
            key={index}
            paddingBottom={20}
            display={'flex'}
            flexDirection={'row'}
          >
            <Text>Siège {value.siege}</Text>
            <Text paddingInline={20}>
              {value.lastAction == GameAction.BET
                ? 'IMG'
                : value.lastAction == GameAction.CHECK
                ? 'ok'
                : value.lastAction == GameAction.FOLD
                ? 'X'
                : ' '}
            </Text>
            <Text> {value.lastAction}</Text>
          </Box>
        ))}
      </Box>
    </Box>
  )
}
