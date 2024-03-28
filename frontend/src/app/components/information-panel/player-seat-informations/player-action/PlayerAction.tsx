import React from 'react';
import {Box, Text} from "@chakra-ui/react";
import {GameActionEnum} from "@/app/enums/GameAction.enum";
import styles from "@/app/components/information-panel/player-seat-informations/player-action/PlayerAction.module.scss";
import Image from "next/image";
import {PlayerHandInfosModel} from "@/app/models/PlayerHandInfos.model";

const CHECK_IMAGE = require('../../../../assets/images/check.png');
const BLUE_TOKEN_IMAGE = require('../../../../assets/images/jeton_poker_v3_Bleu.png');

export default function PlayerAction({playerHandInfos}: { readonly playerHandInfos: PlayerHandInfosModel }) {

    const foldActionContent = () => {
        return (
            <Box id={"fold_action"} className={styles.foldContainer}>
                <Text id={"fold_text"} className={styles.actionValue}>FOLD</Text>
            </Box>
        );
    }

    const allInActionContent = () => {
        return (
            <Box id={"allIn_action"} className={styles.allInContainer}>
                <Text id={"allIn_text"} className={styles.actionValue}>{playerHandInfos.lastAction ? playerHandInfos.lastAction.amount : 'ALL IN'}</Text>
            </Box>
        );
    }

    const checkActionContent = () => {
        return <Image id={"check_action"} src={CHECK_IMAGE} alt="Check" className={styles.imgLastAction} />;
    }

    const betActionContent = () => {
        return (
            <>
                <Image id={"bet_action"} src={BLUE_TOKEN_IMAGE} alt="Bet/Call" className={styles.imgLastActionWithAmount} />
                <Text id={"bet_text"} className={styles.lastActionAmountValue}>{playerHandInfos.lastAction?.amount}</Text>
            </>
        );
    }
    const renderActionContent = () => {
        const {lastAction} = playerHandInfos;
        if (!lastAction) return null;

        if (playerHandInfos.player.balance === 0) return allInActionContent();

        switch (lastAction.actionType) {
            case GameActionEnum.FOLD:
                return foldActionContent();
            case GameActionEnum.ALL_IN:
                return allInActionContent();
            case GameActionEnum.CHECK:
                return checkActionContent();
            case GameActionEnum.BET:
            case GameActionEnum.CALL:
                return betActionContent();
            default:
                return null;
        }
    };

    return (
        <Box id={"action_content"} className={styles.playerAction}>
            {renderActionContent()}
        </Box>
    );
}
