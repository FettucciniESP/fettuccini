import {CardTypeEnum} from "@/app/enums/CardType.enum";
import {Box, Text} from "@chakra-ui/react";
import styles from "./SelectCardValue.module.scss";
import Image from "next/image";
import React from "react";

export default function SelectCardValue({
                                            playerOrStreetLabel,
                                            cardType,
                                        }: {
    playerOrStreetLabel: string,
    cardType: CardTypeEnum | undefined,
}) {

    const cardSelected = (cardValue: string) => {
        console.log(cardValue);
    }

    const cardsImages = Array.from({ length: 13 }, (_, index) => {
        index === 0 ? index = 13 : index;
        const cardValue = `${index + 1}${cardType}`;
        const cardImage = require(`../../../../../assets/images/cards/${cardValue}.gif`);
        return <Image onClick={() => cardSelected(cardValue)} key={index} src={cardImage} alt={`card ${index + 1}`} className={styles.card} />;
    });

    return (
        <Box className={styles.selectCardTypeContainer}>
            <Box>
                <Text className={styles.title}>Veuillez choisir la carte utilisée</Text>
            </Box>
            <Box className={styles.cardsContainer}>
                {cardsImages}
            </Box>
            <Box>
                <Text className={styles.label}>{playerOrStreetLabel}</Text>
            </Box>
        </Box>
    );
}