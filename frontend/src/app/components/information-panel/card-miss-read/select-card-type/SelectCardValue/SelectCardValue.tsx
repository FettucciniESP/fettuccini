import {CardTypeEnum} from "@/app/enums/CardType.enum";
import {Box, Button, Icon, Text} from "@chakra-ui/react";
import styles from "./SelectCardValue.module.scss";
import Image from "next/image";
import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function SelectCardValue({
                                            playerOrStreetLabel,
                                            cardType,
                                            setCard,
                                            backFunction,
                                        }: {
    playerOrStreetLabel: string,
    cardType: CardTypeEnum,
    setCard: (cardType: CardTypeEnum, cardValue: string) => void,
    backFunction: () => void,
}) {

    const cardSelected = (cardValue: string) => {
        setCard(cardValue);
    }

    const cardsImages = Array.from({length: 13}, (_, index) => {
        index === 0 ? index = 13 : index;
        const cardValue = `${index + 1}${cardType}`;
        const cardImage = require(`../../../../../assets/images/cards/${cardValue}.gif`);
        return <Image onClick={() => cardSelected(cardValue)} key={index} src={cardImage} alt={`card ${index + 1}`}
                      className={styles.card}/>;
    });

    return (
        <Box className={styles.selectCardTypeContainer}>
            <Box>
                <Text className={styles.title}>Veuillez choisir la carte utilisée</Text>
            </Box>
            <Box className={styles.cardsContainer}>
                {cardsImages}
            </Box>
            <Box className={styles.boxContainer}>
                <Button className={styles.backButton} onClick={() => backFunction()}>
                    <Icon as={IoMdArrowRoundBack} />
                </Button>
                <Text className={styles.label}>{playerOrStreetLabel}</Text>
            </Box>
        </Box>
    );
}