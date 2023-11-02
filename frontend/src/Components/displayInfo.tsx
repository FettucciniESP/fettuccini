import { Box, Text } from '@chakra-ui/react'

export default function DisplayInfo() {
  return (
    <Box
      w={230}
      h={70}
      bg="#F7F0E1"
      borderRadius={5}
      paddingInline={2}
      paddingBlock={2}
    >
      <Text fontSize={12}>Niveau en cours :</Text>
      <Text
        paddingTop={10}
        display={'flex'}
        justifyContent={'center'}
        fontSize={20}
      >
        2
      </Text>
    </Box>
  )
}
