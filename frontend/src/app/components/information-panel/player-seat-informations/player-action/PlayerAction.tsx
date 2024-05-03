import React, {useEffect, useState} from 'react';
import {Box, Text} from "@chakra-ui/react";
import {GameActionEnum} from "@/app/enums/GameAction.enum";
import styles from "@/app/components/information-panel/player-seat-informations/player-action/PlayerAction.module.scss";
import Image from "next/image";
import {PlayerHandInfosModel} from "@/app/models/PlayerHandInfos.model";
import WinnerBanner
    from "@/app/components/information-panel/player-seat-informations/player-action/banners/WinnerBanner";
import {WinnerInfosModel} from "@/app/models/WinnerInfos.model";
import {Subscription} from "rxjs";
import {playersService} from "@/app/services/players.service";

const CHECK_IMAGE = require('../../../../assets/images/check.png');
const BLUE_TOKEN_IMAGE = require('../../../../assets/images/jeton_poker_v3_Bleu.png');

export default function PlayerAction({playerHandInfos}: { readonly playerHandInfos: PlayerHandInfosModel }) {

    let [winnersInfos, setWinnersInfos] = useState<Array<WinnerInfosModel>>([]);

    useEffect(() => {
        const winnersInfos_subscribe: Subscription = playersService.winnersInformations$.subscribe( (winnersInfos: Array<WinnerInfosModel>) => {
            setWinnersInfos(winnersInfos);
        });
        return () => {
            winnersInfos_subscribe.unsubscribe();
        }
    }, [winnersInfos]);

    const foldActionContent = () => {
        return (
            <Box id={"fold_action"} className={styles.foldContainer}>
                <Text id={"fold_text"} className={styles.actionValue}>FOLD</Text>
            </Box>
        );
    }

    const winnerActionContent = (amountWin: number) => {
        return (
            <WinnerBanner ammountWin={amountWin} />
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
        if (!!playerHandInfos.player.seatIndex && playerHandInfos.player.balance === 0) return allInActionContent();

        console.log('1', playerHandInfos)
        const winningInformations: WinnerInfosModel|undefined = playerIsWinner();
        console.log('2', playerHandInfos)
        if (!!winningInformations) return winnerActionContent(winningInformations.amount);
        console.log('3', playerHandInfos)

        if (!lastAction) return null;
        console.log('4', playerHandInfos)

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

    function playerIsWinner(): WinnerInfosModel | undefined {
        const winningInformations = winnersInfos.find(winner => winner.seatIndex === playerHandInfos.player.seatIndex);
        return winningInformations;
    }

    return (
        <Box id={"action_content"} className={styles.playerAction}>
            {renderActionContent()}
        </Box>
    );
}
