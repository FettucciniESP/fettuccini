import FettucciniContainer from "@/app/components/fettuccini-container/FettucciniContainer";
import {PlayerHandInfosModel} from "@/app/models/PlayerHandInfos.model";
import styles from "@/app/components/information-panel/player-seat-informations/PlayerSeatInformations.module.scss";
import {Box, Text} from "@chakra-ui/react";
import StackContainer from "@/app/components/stack-container/StackContainer";
import Image from "next/image";
import {GameActionEnum} from "@/app/enums/GameAction.enum";
import usePlayerSeatInformations
    from "@/app/components/information-panel/player-seat-informations/usePlayerSeatInformations";

export default function PlayerSeatInformations({
                                                   seatIndex,
                                                   playerHandInfos,
                                                   buttonSeatIndex,
                                                   currentPlayerSeatIndex
                                               }: {
    seatIndex: number,
    playerHandInfos: PlayerHandInfosModel,
    buttonSeatIndex: number,
    currentPlayerSeatIndex: number
}) {

    const {seatPlaying} = usePlayerSeatInformations();

    return (
        <FettucciniContainer variantStyle={seatPlaying(playerHandInfos, currentPlayerSeatIndex)}>
            <Box className={styles.header}>
                <Text>Siège {seatIndex}</Text>
            </Box>
            {playerHandInfos.lastAction && [GameActionEnum.FOLD].includes(playerHandInfos.lastAction?.actionType) &&
                <Box className={styles.playerAction}>
                    <Box className={styles.foldContainer}>
                        <Text className={styles.actionValue}>FOLD</Text>
                    </Box>
                </Box>}
            {playerHandInfos.player.balance === 0 &&
                <Box className={styles.playerAction}>
                    <Box className={styles.allInContainer}>
                        <Text className={styles.actionValue}>{playerHandInfos.lastAction ? playerHandInfos.lastAction.amount : 'ALL IN'}</Text>
                    </Box>
                </Box>}
            {playerHandInfos.lastAction && [GameActionEnum.CHECK].includes(playerHandInfos.lastAction?.actionType) &&
                <Box className={styles.playerAction}>
                    <Image
                        src={require('../../../assets/images/check.png')}
                        alt="icone action"
                        className={styles.imgLastAction}
                    />
                </Box>}
            {(!playerHandInfos.lastAction || ![GameActionEnum.FOLD, GameActionEnum.CHECK, GameActionEnum.CALL, GameActionEnum.BET, GameActionEnum.ALL_IN].includes(playerHandInfos.lastAction?.actionType)) && playerHandInfos.player.balance > 0 &&
                <Box className={styles.playerAction}>
                </Box>}
            {playerHandInfos.lastAction && [GameActionEnum.BET, GameActionEnum.CALL].includes(playerHandInfos.lastAction?.actionType) && playerHandInfos.player.balance > 0 &&
                <Box className={styles.playerAction}>
                    <Image
                        src={require('../../../assets/images/jeton_poker_v3_Bleu.png')}
                        alt="icone action"
                        className={styles.imgLastActionWithAmount}
                    />
                    <Text className={styles.lastActionAmountValue}>
                        {playerHandInfos.lastAction?.amount}
                    </Text>
                </Box>}
            <Box className={styles.playerInformations}>
                <StackContainer>
                    <Image
                        src={require('../../../assets/images/jeton_poker_v3_Blanc.png')}
                        alt="icone action"
                        className={styles.imgBalance}
                    />
                    <Box className={styles.balanceContainer}>
                        <Text className={styles.balanceValue}>{playerHandInfos.player.balance}</Text>
                    </Box>
                </StackContainer>
                {seatIndex === buttonSeatIndex && <Image
                    src={require('../../../assets/images/jeton_poker_v3_Bleu.png')}
                    alt="icone action"
                    className={styles.imgSeatInformation}
                />}
            </Box>
        </FettucciniContainer>
    );
}