import {Box, Text} from "@chakra-ui/react";
import styles from "@/app/components/information-panel/game-informations/GameInformations.module.scss";
import FettucciniContainer from "@/app/components/design-system/fettuccini-container/FettucciniContainer";
import TimeRemaining from "@/app/components/information-panel/time-remaining/TimeRemaining";
import {RoundInfosModel} from "@/app/models/RoundInfos.model";
import {LevelInfosModel} from "@/app/models/LevelInfos.model";
import ActionButtons from "@/app/components/information-panel/game-informations/action-buttons/ActionButtons";
import TotalTime from "@/app/components/information-panel/total-time/TotalTime";

export default function GameInformations({roundInfos, currentLevelInfos, nextLevelInfos}: { readonly roundInfos: RoundInfosModel, readonly currentLevelInfos: LevelInfosModel, readonly nextLevelInfos: LevelInfosModel}) {

    return (
        <FettucciniContainer>
            <Box id={"timer"} className={styles.centeredContainer}>
                <Box className={styles.timeRemainingContainer}>
                    <TimeRemaining/>
                </Box>
            </Box>
            <Box className={styles.spaceBetweenContainer}>
                <Box id={"totalTime"} className={styles.totalTimeContainer}>
                    <TotalTime/>
                </Box>
                <Box id={"pot"} className={styles.levelsInformationsContainer}>
                    <Text id={"pot2"} className={styles.levelInformationTitle}>Pot :</Text>
                    <Text id={"pot_value"} className={styles.potAmount}>{roundInfos.currentPotAmount}</Text>
                </Box>
            </Box>
            <Box className={styles.spaceBetweenContainer}>
                <Box id={"currentLevel"}className={styles.levelsInformationsContainer}>
                    <Text id={"currentLevel2"}className={styles.levelInformationTitle}>Niveau en cours :</Text>
                    <Text id={"currentLevel_value"}className={styles.levelInformationValue}>{currentLevelInfos.levelIndex}</Text>
                </Box>
                <Box id={"nextLevel"} className={styles.levelsInformationsContainer}>
                    <Text id={"nextLevel2"} className={styles.levelInformationTitle}>Niveau suivant :</Text>
                    <Text id={"nextLevel_value"} className={styles.levelInformationValue}>{nextLevelInfos.levelIndex}</Text>
                </Box>
            </Box>
            <Box className={styles.spaceBetweenContainer}>
                <Box id={"levelTime"} className={styles.levelsInformationsContainer}>
                    <Text id={"levelTime2"} className={styles.levelInformationTitle}>Temps du niveau :</Text>
                    <Text id={"levelTime_value"} className={styles.levelInformationValue}>{nextLevelInfos.duration} minutes</Text>
                </Box>
            </Box>
            <Box id={"actionButtons"} className={styles.actionsButtonsContainer}>
                <ActionButtons playerInfos={roundInfos.currentPlayingUser} />
            </Box>
        </FettucciniContainer>
    )
}