import { Box, Button, ChakraProvider, Stack } from '@chakra-ui/react'

import imageJeton from '@/images/jeton_poker_v3_Blanc.png'
import Image from 'next/image'
import { PlayerInfos } from '@/app/models/playerInfos'

export default function ActionFooter(playerInfos: PlayerInfos) {
  return (
    <Box bg="#142530" borderTopWidth={2} borderColor="#F7F0E1" height="auto">
      <Box display="flex">
        <Box
          w={1 / 4}
          padding={2}
          textAlign={'center'}
          color="#182E3B"
          fontSize="1.5em"
          backgroundColor="#F7F0E1"
          borderRadius={0}
          borderBottomRightRadius={20}
        >
          Action siege {playerInfos.index}
        </Box>

        {playerInfos && (
          <Box
            display="flex"
            alignItems="center"
            justifyContent={'space-evenly'}
            w={1 / 6}
          >
            <Box color="#F7F0E1" fontSize="1.5em">
              {playerInfos.stack}
            </Box>
            <Image
              src={imageJeton}
              alt="Jeton"
              style={{ width: '24px', height: 'auto' }}
            />
          </Box>
        )}
      </Box>

      <Stack
        direction="row"
        align="center"
        justifyContent={'space-evenly'}
        paddingY={10}
      >
        <Button
          w={1 / 6}
          bg="#F7F0E1"
          color="#182E3B"
          size="lg"
          fontWeight={'medium'}
        >
          FOLD
        </Button>
        <Button
          w={1 / 6}
          bg="#F7F0E1"
          color="#182E3B"
          size="lg"
          fontWeight={'medium'}
        >
          CHECK / CALL
        </Button>
        <Button
          w={1 / 6}
          bg="#F7F0E1"
          color="#182E3B"
          size="lg"
          fontWeight={'medium'}
        >
          BET
        </Button>
        <Button
          w={1 / 6}
          bg="#F7F0E1"
          color="#182E3B"
          size="lg"
          fontWeight={'medium'}
        >
          ALL-IN
        </Button>
      </Stack>
    </Box>
  )
}
