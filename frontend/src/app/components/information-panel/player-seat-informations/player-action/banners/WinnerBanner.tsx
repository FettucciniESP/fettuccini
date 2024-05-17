import React from 'react';
import {Box, Text} from "@chakra-ui/react";
import styles from "./WinnerBanner.module.scss";
import Image from "next/image";

const WHITE_TOKEN_IMAGE = require('../../../../../assets/images/jeton_poker_v3_Blanc.png');
const CROWN_IMAGE = require('../../../../../assets/images/crown.png');

export default function WinnerBanner({ammountWin}: { readonly ammountWin: number }) {
    return (
        <Box className={styles.winningContainer}>
            <Box id={"winner_box"} className={styles.winnerContainer}>
                    <Image id={"crown"} src={CROWN_IMAGE} alt="crown winner" className={styles.crown} />
                    <Image id={"winner_token1"} src={WHITE_TOKEN_IMAGE} alt="White token" className={styles.imgWhiteTokenLeft} />
                    <Text id={"winner_text"} className={styles.actionValue}>{ammountWin}</Text>
                    <Image id={"winner_token2"} src={WHITE_TOKEN_IMAGE} alt="White token" className={styles.imgWhiteTokenRight} />
            </Box>
        </Box>
    );
}
