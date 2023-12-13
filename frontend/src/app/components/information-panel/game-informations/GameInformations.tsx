import {Box, Button, Text} from "@chakra-ui/react";
import styles from "@/app/components/information-panel/game-informations/GameInformations.module.scss";
import FettucciniContainer from "@/app/components/fettuccini-container/FettucciniContainer";
import TimeRemaining from "@/app/components/information-panel/time-remaining/TimeRemaining";
import {RoundInfosModel} from "@/app/models/RoundInfos.model";
import {LevelInfosModel} from "@/app/models/LevelInfos.model";
import ActionButtons from "@/app/components/information-panel/game-informations/action-buttons/ActionButtons";
import TotalTime from "@/app/components/information-panel/total-time/TotalTime";

export default function GameInformations({roundInfos, currentLevelInfos, nextLevelInfos}: { roundInfos: RoundInfosModel, currentLevelInfos: LevelInfosModel, nextLevelInfos: LevelInfosModel}) {

    return (
        <FettucciniContainer>
            <Box className={styles.centeredContainer}>
                <Box className={styles.timeRemainingContainer}>
                    <TimeRemaining/>
                </Box>
            </Box>
            <Box className={styles.spaceBetweenContainer}>
                <Box className={styles.totalTimeContainer}>
                    <TotalTime/>
                </Box>
                <Box className={styles.levelsInformationsContainer}>
                    <Text className={styles.levelInformationTitle}>Pot :</Text>
                    <Text className={styles.potAmount}>{roundInfos.currentPotAmount}</Text>
                </Box>
            </Box>
            <Box className={styles.spaceBetweenContainer}>
                <Box className={styles.levelsInformationsContainer}>
                    <Text className={styles.levelInformationTitle}>Niveau en cours :</Text>
                    <Text className={styles.levelInformationValue}>{currentLevelInfos.levelIndex}</Text>
                </Box>
                <Box className={styles.levelsInformationsContainer}>
                    <Text className={styles.levelInformationTitle}>Niveau suivant :</Text>
                    <Text className={styles.levelInformationValue}>{nextLevelInfos.levelIndex}</Text>
                </Box>
            </Box>
            <Box className={styles.spaceBetweenContainer}>
                <Box className={styles.levelsInformationsContainer}>
                    <Text className={styles.levelInformationTitle}>Temps du niveau :</Text>
                    <Text className={styles.levelInformationValue}>{nextLevelInfos.duration} minutes</Text>
                </Box>
            </Box>
            <Box className={styles.actionsButtonsContainer}>
                <ActionButtons playerInfos={roundInfos.currentPlayingUser}></ActionButtons>
            </Box>
        </FettucciniContainer>
    )
}