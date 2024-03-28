import FettucciniModal from "@/app/components/design-system/fettuccini-modal/FettucciniModal";
import styles from './EndGameModal.module.scss'
import {Box, Text, Button} from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import useEndGameModal from "@/app/components/information-panel/end-game-modal/useEndGameModal";
import {NextRouter, useRouter} from "next/router";

const CROWN_IMAGE = require('../../../assets/images/crown.png');

export default function EndGameModal({
                                         modalIsOpen,
                                         onCloseFunction,
                                         winnerLabel,
                                     }: {
    readonly modalIsOpen: boolean,
    readonly onCloseFunction: () => void,
    readonly winnerLabel: string,
}) {
    const router: NextRouter = useRouter();

    const handleCloseModal = () => {
        router.push("/home");
    };

    return (
        <FettucciniModal modalIsOpen={modalIsOpen} onCloseFunction={onCloseFunction} canCloseModal={false}>
            <Box className={styles.containerEndGame}>
                <Text className={styles.title}>FIN DE LA PARTIE</Text>
                <Image id={"check_action"} src={CROWN_IMAGE} alt="Check" className={styles.crownImage} />
                <Text className={styles.contentLabel}>{winnerLabel}</Text>
                <Button id={"idButtonContinue"} onClick={() => handleCloseModal()} className={styles.button}>
                    CONTINUER
                </Button>
            </Box>
        </FettucciniModal>
    );
};