import InformationContainer from '@/app/components/information-container/InformationContainer'
import { PlayerHandInfosModel } from '@/app/models/PlayerHandInfos.model'
import { Box, Text } from '@chakra-ui/react'
import Image from 'next/image'
import styles from './PlayersStatus.module.scss'
import usePlayersStatus from './usePlayersStatus'

export default function PlayersStatus({
                                          playersHandInfos,
                                      }: {
    playersHandInfos: PlayerHandInfosModel[]
}) {
    const {getActionIcon} = usePlayersStatus(playersHandInfos)

    return (
        <InformationContainer>
            <Box className={styles.header}>
                <Text>Joueurs</Text>
            </Box>
            <Box className={styles.playerList}>
                {playersHandInfos.map((playerHandInfos, index) => (
                    <Box key={index} className={styles.playerItem}>
                        <Text className={styles.playerSubItem}>{playerHandInfos.player.name}</Text>
                        <Image
                            src={getActionIcon(playerHandInfos.lastAction?.actionType)}
                            alt="icone action"
                            className={styles.imgLastAction}
                        />
                        <Text className={styles.lastActionText}>
                            {playerHandInfos.lastAction ? playerHandInfos.lastAction.actionType :
                                <Text className={styles.noActions}>En attente d&apos;une action</Text>}

                        </Text>
                        {playerHandInfos.lastAction && playerHandInfos.lastAction.amount > 0 ?
                            <Text className={styles.lastActionText}> {playerHandInfos.lastAction.amount}</Text> : null}
                    </Box>
                ))}
            </Box>
        </InformationContainer>
    )
}
