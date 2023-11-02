import { Box, Text } from '@chakra-ui/react'

export default function DisplayInfo(Title: string, info: any) {
  return (
    <Box
      w={230}
      h={70}
      bg="#F7F0E1"
      borderRadius={5}
      paddingInline={2}
      paddingBlock={2}
    >
      <Text fontSize={12}>{Title}</Text>
      <Text
        paddingTop={10}
        display={'flex'}
        justifyContent={'center'}
        fontSize={20}
      >
        {info}
      </Text>
    </Box>
  )
}
