import { Box, Text } from '@chakra-ui/react'
import styles from './HandHistory.module.scss'
import InformationContainer from '@/app/components/information-container/InformationContainer'
import { HandHistoryModel } from '@/app/models/HandHistory.model'
import useHandHistory from './useHandHistory'

export default function HandHistory({
  HandHistoryInfos,
}: {
  HandHistoryInfos: HandHistoryModel[]
}) {
  const { getActionIcon } = useHandHistory(HandHistoryInfos)
  return (
    <InformationContainer>
      <Box className={styles.header}>
        <Text as={'b'} fontSize={22}>
          Historique de la main
        </Text>
      </Box>
      <Box className={styles.historyList}>
        {HandHistoryInfos.map((value, index) => (
          <Box key={index} className={styles.historyItem}>
            <Text>Siège {value.siege}</Text>
            <Text paddingInline={20}>{getActionIcon(value.action)}</Text>
            <Text paddingInline={1}>{value.action} </Text>
            <Text> {value.betValue}</Text>
          </Box>
        ))}
      </Box>
    </InformationContainer>
  )
}
