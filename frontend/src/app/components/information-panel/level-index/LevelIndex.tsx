import {Box, Text} from '@chakra-ui/react'
import InformationContainer from '../../information-container/InformationContainer'
import styles from './LevelIndex.module.scss'
import {LevelInfosModel} from '@/app/models/LevelInfos.model'

export default function LevelIndex({
                                       levelInfos,
                                   }: {
    levelInfos: LevelInfosModel
}) {
    return (
        <InformationContainer>
            <Box className={styles.container}>
                <Text className={styles.title}>Niveau en cours : </Text>
                <Text className={styles.levelIndex}>{levelInfos.levelIndex}</Text>
            </Box>
        </InformationContainer>
    )
}
