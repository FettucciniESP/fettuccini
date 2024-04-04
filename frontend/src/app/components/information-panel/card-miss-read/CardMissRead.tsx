import FettucciniModal from "@/app/components/design-system/fettuccini-modal/FettucciniModal";
import {Box, Text, Button} from "@chakra-ui/react";
import React, {useState} from "react";
import styles from "./CardMissRead.module.scss";
import Image from "next/image";
import SelectCardType from "@/app/components/information-panel/card-miss-read/select-card-type/SelectCardType";
import SelectCardValue from "@/app/components/information-panel/card-miss-read/select-card-type/SelectCardValue/SelectCardValue";
import {CardTypeEnum} from "@/app/enums/CardType.enum";

export default function CardMissRead({
                                         isModalOpen,
                                         closeModal,
                                         playerOrStreetLabel,
                                         cardsValues,
                                     }: {
    isModalOpen: boolean,
    closeModal: () => void,
    playerOrStreetLabel: string,
    cardsValues: (string | null)[],
}) {

    const [cardTypeView, setCardTypeView] = useState(false);
    const [cardTypeValue, setCardTypeValue] = useState<CardTypeEnum>();
    const [cardValueView, setCardValueView] = useState(false);

    const cardImages = cardsValues.map((cardValue, index) => {
        if (!cardValue) {
            cardValue = "isNull";
        }
        const cardImage = require(`../../../assets/images/cards/${cardValue}.gif`);
        return <Image key={index} src={cardImage} alt={`card ${index + 1}`} className={styles.card} />;
    });

    const handleCloseModal = () => {
        closeModal();
    };

    const handleActiveCardType = () => {
        setCardTypeView(true);
    };

    const handleActiveCardValue = (cardType: CardTypeEnum) => {
        setCardTypeView(false);
        setCardTypeValue(cardType);
        setCardValueView(true);
    };

    return (
        <FettucciniModal modalIsOpen={isModalOpen} onCloseFunction={closeModal} canCloseModal={false}>
            { !cardTypeView && !cardValueView && (<Box className={styles.missReadContainer}>
                <Box className={styles.playerContainer}>
                    <Box>
                        <Text className={styles.title}>{playerOrStreetLabel}</Text>
                    </Box>
                    <Box className={styles.cardsContainer}>
                        {cardImages}
                    </Box>
                </Box>
                <Box className={styles.buttonsContainer}>
                    <Button id={"idButtonContinue"} onClick={() => handleActiveCardType()}>
                        CHOOSE
                    </Button>
                    <Button id={"idButtonContinue"} onClick={() => handleActiveCardType()}>
                        MUCK
                    </Button>
                </Box>
            </Box>)}
            { cardTypeView && (<SelectCardType playerOrStreetLabel={playerOrStreetLabel} handleActiveCardValue={handleActiveCardValue} />)}
            { cardValueView && (<SelectCardValue playerOrStreetLabel={playerOrStreetLabel} cardType={cardTypeValue} />)}
        </FettucciniModal>
    );
}