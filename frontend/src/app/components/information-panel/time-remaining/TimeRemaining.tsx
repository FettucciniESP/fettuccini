import {Box} from '@chakra-ui/react'
import styles from './TimeRemaining.module.scss'
import InformationContainer from '@/app/components/design-system/information-container/InformationContainer'
import {TimerCountDown} from '@/app/components/information-panel/time-remaining/timer-count-down/TimerCountDown'

export default function TimeRemaining() {
    return (
        <InformationContainer>
            <Box className={styles.container}>
                <TimerCountDown/>
            </Box>
        </InformationContainer>
    )
}
