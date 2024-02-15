import FettucciniContainer from "@/app/components/design-system/fettuccini-container/FettucciniContainer";
import {PlayerHandInfosModel} from "@/app/models/PlayerHandInfos.model";
import styles from "@/app/components/information-panel/player-seat-informations/PlayerSeatInformations.module.scss";
import {Box, Text} from "@chakra-ui/react";
import StackContainer from "@/app/components/design-system/stack-container/StackContainer";
import Image from "next/image";
import usePlayerSeatInformations
    from "@/app/components/information-panel/player-seat-informations/usePlayerSeatInformations";
import PlayerAction from "@/app/components/information-panel/player-seat-informations/player-action/PlayerAction";

const BLUE_TOKEN_IMAGE = require('../../../assets/images/jeton_poker_v3_Bleu.png');
const WHITE_TOKEN_IMAGE = require('../../../assets/images/jeton_poker_v3_Blanc.png');

export default function PlayerSeatInformations({
                                                   seatIndex,
                                                   playerHandInfos,
                                                   buttonSeatIndex,
                                                   currentPlayerSeatIndex
                                               }: {
    readonly seatIndex: number,
    readonly playerHandInfos: PlayerHandInfosModel,
    readonly buttonSeatIndex: number,
    readonly currentPlayerSeatIndex: number
}) {

    const {seatPlaying} = usePlayerSeatInformations();

    return (
        <FettucciniContainer variantStyle={seatPlaying(playerHandInfos, currentPlayerSeatIndex)}>
            <Box className={styles.header}>
                <Text>Siège {seatIndex}</Text>
            </Box>
            <PlayerAction playerHandInfos={playerHandInfos} />
            <Box className={styles.playerInformations}>
                <StackContainer>
                    <Image
                        src={WHITE_TOKEN_IMAGE}
                        alt="icone action"
                        className={styles.imgBalance}
                    />
                    <Box className={styles.balanceContainer}>
                        <Text className={styles.balanceValue}>{playerHandInfos.player.balance}</Text>
                    </Box>
                </StackContainer>
                {seatIndex === buttonSeatIndex && <Image
                    src={BLUE_TOKEN_IMAGE}
                    alt="icone action"
                    className={styles.imgSeatInformation}
                />}
            </Box>
        </FettucciniContainer>
    );
}