import {Box, Text} from '@chakra-ui/react'
import Image from 'next/image'
import {PlayerHandInfosModel} from '@/app/models/PlayerHandInfos.model'
import styles from './PlayersStatus.module.scss'
import usePlayersStatus from './usePlayersStatus'
import InformationContainer from '@/app/components/information-container/InformationContainer'

export default function PlayersStatus({playersHandInfos}: { playersHandInfos: PlayerHandInfosModel[] }) {
    const {getActionIcon} = usePlayersStatus(playersHandInfos)

    return (
        <InformationContainer>
            <Box className={styles.header}>
                <Text>Joueurs</Text>
            </Box>
            <Box className={styles.playerList}>
                {playersHandInfos.map((value, index) => (
                    <Box key={index} className={styles.playerItem}>
                        <Text>Siège {value.seatIndex}</Text>
                        <Image
                            src={getActionIcon(value.lastAction)}
                            alt="icone action"
                            style={{width: 24, height: 'auto'}}
                        />
                        <Text> {value.lastAction}</Text>
                    </Box>
                ))}
            </Box>
        </InformationContainer>
    )
}
