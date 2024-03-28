import {Box, Text} from '@chakra-ui/react'
import styles from './BlindsInformations.module.scss'
import {LevelInfosModel} from '@/app/models/LevelInfos.model'
import Image from "next/image";

const BLUE_TOKEN_IMAGE = require('../../../assets/images/jeton_poker_v3_Bleu.png');
const WHITE_TOKEN_IMAGE = require('../../../assets/images/jeton_poker_v3_Blanc.png');
export default function BlindsInformations({currentLevelInfos}: { readonly currentLevelInfos: LevelInfosModel}) {

    return (
        <Box id={"blindsInformations"}>
            {currentLevelInfos && <Box id={"ante_img"} className={styles.levelsInformationsContainer}>
                <Image
                    src={WHITE_TOKEN_IMAGE}
                    alt="icone action"
                    className={styles.imgLevelInformation}
                />
                <Text id={"ante"} className={styles.levelInformationTitle}>Ante :</Text>
                <Text id={"ante_value"} className={styles.levelInformationValue}>{currentLevelInfos.ante}</Text>
            </Box>}
            {currentLevelInfos && <Box id={"big_blind_img"} className={styles.levelsInformationsContainer}>
                <Image
                    src={BLUE_TOKEN_IMAGE}
                    alt="icone action"
                    className={styles.imgLevelInformation}
                />
                <Text id={"big_blind"} className={styles.levelInformationTitle}>Big Blind :</Text>
                <Text id={"big_blind_value"} className={styles.levelInformationValue}>{currentLevelInfos.bigBlind}</Text>
            </Box>}
            {currentLevelInfos && <Box id={"small_blind_img"} className={styles.levelsInformationsContainer}>
                <Image
                    src={WHITE_TOKEN_IMAGE}
                    alt="icone action"
                    className={styles.imgLevelInformation}
                />
                <Text id={"small_blind"} className={styles.levelInformationTitle}>Small Blind :</Text>
                <Text id={"small_blind_value"} className={styles.levelInformationValue}>{currentLevelInfos.smallBlind}</Text>
            </Box>}
        </Box>
    )
}
