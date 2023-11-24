import { Box, Text } from '@chakra-ui/react'
import Image from 'next/image'
import styles from './HandHistory.module.scss'
import InformationContainer from '@/app/components/information-container/InformationContainer'
import { HandPlayersActionsHistoryModel } from '@/app/models/HandPlayersActionsHistoryModel'
import useHandHistory from './useHandHistory'
import HandStepHistory from "@/app/components/hand-history/hand-step-history/HandStepHistory";

export default function HandHistory({
  handHistoryInfos,
}: {
  handHistoryInfos: HandPlayersActionsHistoryModel
}) {
    return (
        <InformationContainer>
            <Box className={styles.header}>
                <Text as={'b'} fontSize={22}>
                    Historique de la main
                </Text>
            </Box>
            <Box className={styles.historyList}>
                {handHistoryInfos.preflop && <HandStepHistory handStepName="Preflop" playersActions={handHistoryInfos.preflop} />}
                {handHistoryInfos.flop && <HandStepHistory handStepName="Flop" playersActions={handHistoryInfos.flop} />}
                {handHistoryInfos.turn && <HandStepHistory handStepName="Turn" playersActions={handHistoryInfos.turn} />}
                {handHistoryInfos.river && <HandStepHistory handStepName="River" playersActions={handHistoryInfos.river} />}
            </Box>
        </InformationContainer>
    );
}
