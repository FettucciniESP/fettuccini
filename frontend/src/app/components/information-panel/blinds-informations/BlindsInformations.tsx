import {Box, Text} from '@chakra-ui/react'
import styles from './BlindsInformations.module.scss'
import {LevelInfosModel} from '@/app/models/LevelInfos.model'
import Image from "next/image";

const BLUE_TOKEN_IMAGE = require('../../../assets/images/jeton_poker_v3_Bleu.png');
const WHITE_TOKEN_IMAGE = require('../../../assets/images/jeton_poker_v3_Blanc.png');
export default function BlindsInformations({currentLevelInfos}: { readonly currentLevelInfos: LevelInfosModel}) {

    return (
        <Box>
            {currentLevelInfos && <Box className={styles.levelsInformationsContainer}>
                <Image
                    src={WHITE_TOKEN_IMAGE}
                    alt="icone action"
                    className={styles.imgLevelInformation}
                />
                <Text className={styles.levelInformationTitle}>Ante :</Text>
                <Text className={styles.levelInformationValue}>{currentLevelInfos.ante}</Text>
            </Box>}
            {currentLevelInfos && <Box className={styles.levelsInformationsContainer}>
                <Image
                    src={BLUE_TOKEN_IMAGE}
                    alt="icone action"
                    className={styles.imgLevelInformation}
                />
                <Text className={styles.levelInformationTitle}>Big Blind :</Text>
                <Text className={styles.levelInformationValue}>{currentLevelInfos.bigBlind}</Text>
            </Box>}
            {currentLevelInfos && <Box className={styles.levelsInformationsContainer}>
                <Image
                    src={WHITE_TOKEN_IMAGE}
                    alt="icone action"
                    className={styles.imgLevelInformation}
                />
                <Text className={styles.levelInformationTitle}>Small Blind :</Text>
                <Text className={styles.levelInformationValue}>{currentLevelInfos.smallBlind}</Text>
            </Box>}
        </Box>
    )
}