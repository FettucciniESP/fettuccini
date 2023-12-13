import {Box, Text} from '@chakra-ui/react'
import styles from './TimeRemaining.module.scss'
import InformationContainer from '@/app/components/information-container/InformationContainer'
import {TimerCountDown} from './timer/TimerCountDown'
import {LevelInfosModel} from '@/app/models/LevelInfos.model'
import {RoundInfosModel} from "@/app/models/RoundInfos.model";

export default function TimeRemaining() {

    return (
        <InformationContainer>
            <Box className={styles.container}>
                <TimerCountDown/>
            </Box>
        </InformationContainer>
    )
}
