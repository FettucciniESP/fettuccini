import { Box, Text } from '@chakra-ui/react'
import Image from 'next/image'
import styles from '../HandHistory.module.scss'
import useHandHistory from "@/app/components/information-panel/hand-history/useHandHistory";
import {PlayerActionModel} from "@/app/models/PlayerAction.model";

export default function HandStepHistory({
  handStepName,
  playersActions,
}: {
    handStepName: string,
    playersActions: PlayerActionModel[]
}) {
  const { getActionIcon } = useHandHistory();
    if (!playersActions || playersActions.length === 0) {
        return null;
    }
    return (
        <>
            <Text as={'b'} fontSize={18} className={styles.stageHeader}>
                {handStepName}
            </Text>
            {playersActions.map((action, index) => (
                <Box key={index} className={styles.historyItem}>
                    <Text className={styles.historySubItem}>
                        Siège {action.seatIndex}
                    </Text>
                    <Image
                        src={getActionIcon(action.actionType)}
                        alt="icone action"
                        style={{ width: 24, height: 'auto', marginInlineEnd: 10 }}
                    />
                    <Text paddingInlineEnd={1}>{action.actionType} </Text>
                    {action.amount > 0 ? <Text> {action.amount}</Text> : null}
                </Box>
            ))}
        </>
    )
}
