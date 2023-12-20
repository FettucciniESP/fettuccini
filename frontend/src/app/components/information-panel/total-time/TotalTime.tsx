import {Box, Text} from '@chakra-ui/react'
import styles from './TotalTime.module.scss'
import InformationContainer from '@/app/components/design-system/information-container/InformationContainer'
import {TimerCountUp} from '@/app/components/information-panel/total-time/timer-count-up/TimerCountUp'

export default function TotalTime() {
    return (
        <InformationContainer>
            <Box className={styles.container}>
                <TimerCountUp/>
            </Box>
        </InformationContainer>
    )
}
