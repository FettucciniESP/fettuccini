import { Box, Text } from '@chakra-ui/react'
import styles from './HandHistory.module.scss'
import InformationContainer from '@/app/components/information-container/InformationContainer'
import { RoundPlayersActionsHistoryModel } from '@/app/models/RoundPlayersActionsHistoryModel'
import HandStepHistory from "@/app/components/information-panel/hand-history/hand-step-history/HandStepHistory";
import {useEffect, useRef} from "react";

export default function HandHistory({
  handHistoryInfos,
}: {
  handHistoryInfos: RoundPlayersActionsHistoryModel
}) {
    const historyListRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (historyListRef.current) {
            historyListRef.current.scrollTop = historyListRef.current.scrollHeight;
        }
    }, [handHistoryInfos]);

    return (
        <InformationContainer>
            <Box className={styles.header}>
                <Text as={'b'} fontSize={22}>
                    Historique de la main
                </Text>
            </Box>
            <Box className={styles.historyList} ref={historyListRef}>
                {handHistoryInfos.preflop && <HandStepHistory handStepName="Preflop" playersActions={handHistoryInfos.preflop} />}
                {handHistoryInfos.flop && <HandStepHistory handStepName="Flop" playersActions={handHistoryInfos.flop} />}
                {handHistoryInfos.turn && <HandStepHistory handStepName="Turn" playersActions={handHistoryInfos.turn} />}
                {handHistoryInfos.river && <HandStepHistory handStepName="River" playersActions={handHistoryInfos.river} />}
            </Box>
        </InformationContainer>
    );
}
