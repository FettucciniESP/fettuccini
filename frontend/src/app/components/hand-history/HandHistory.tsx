import { Box, Text } from '@chakra-ui/react'
import Image from 'next/image'
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
          <Box>
            {value.cardStatus == '' ? (
              <Box key={index} className={styles.historyItem}>
                <Text className={styles.historySubItem}>
                  Siège {value.seat}
                </Text>
                <Image
                  src={getActionIcon(value.action)}
                  alt="icone action"
                  style={{ width: 24, height: 'auto', marginInlineEnd: 10 }}
                />
                <Text paddingInlineEnd={1}>{value.action} </Text>
                {value.betValue > 0 ? <Text> {value.betValue}</Text> : <></>}
              </Box>
            ) : (
              <Box key={index} className={styles.historyItem}>
                <Text className={styles.historyStatusItem}>
                  {value.cardStatus}
                </Text>
              </Box>
            )}
          </Box>
        ))}
      </Box>
    </InformationContainer>
  )
}
