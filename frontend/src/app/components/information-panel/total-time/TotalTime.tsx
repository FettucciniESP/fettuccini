import {Box, Text} from '@chakra-ui/react'
import styles from './TotalTime.module.scss'
import InformationContainer from '@/app/components/information-container/InformationContainer'
import {TimerCountUp} from './timer/TimerCountUp'
import {LevelInfosModel} from '@/app/models/LevelInfos.model'
import {RoundInfosModel} from "@/app/models/RoundInfos.model";

export default function TotalTime() {

    return (
        <InformationContainer>
            <Box className={styles.container}>
                <TimerCountUp/>
            </Box>
        </InformationContainer>
    )
}
