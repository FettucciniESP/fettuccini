import FettucciniModal from "@/app/components/design-system/fettuccini-modal/FettucciniModal";
import {Box, Text, Button} from "@chakra-ui/react";
import React, {useState} from "react";
import styles from "./CardMisread.module.scss";
import Image from "next/image";
import SelectCardType from "@/app/components/information-panel/card-miss-read/select-card-type/SelectCardType";
import SelectCardValue
    from "@/app/components/information-panel/card-miss-read/select-card-type/SelectCardValue/SelectCardValue";
import {CardTypeEnum} from "@/app/enums/CardType.enum";
import {CardValueEnum} from "@/app/enums/CardValue.enum";
import {CardModel} from "@/app/models/Card.model";
import {toastService} from "@/app/services/toast.service";
import {croupierLoadingService} from "@/app/services/croupier-loading.service";
import {RoundInfosModel} from "@/app/models/RoundInfos.model";
import {ActionNeededInfosModel} from "@/app/models/ActionNeededInfos.model";

export default function CardMisread({
                                        isModalOpen,
                                        closeModal,
                                        actionNeededInfos,
                                        roundId,
                                        finishRound,
                                    }: {
    isModalOpen: boolean,
    closeModal: () => void,
    actionNeededInfos: ActionNeededInfosModel,
    roundId: string,
    finishRound: (roundInfos: RoundInfosModel) => void,
}) {

    const [cardTypeView, setCardTypeView] = useState(false);
    const [cardTypeValue, setCardTypeValue] = useState<CardTypeEnum>();
    const [cardValueView, setCardValueView] = useState(false);
    const [cardsMisread, setCardsMisread] = useState(actionNeededInfos.cardMisreads);
    const [impossibleCards, setImpossibleCards] = useState(actionNeededInfos.impossibleCards);

    function getCardImages() {
        const {cards, player} = cardsMisread[0];
        const totalCardsCount = player == null ? 5 : 2;
        const cardClass = player == null ? styles.boardCard : styles.playerCard;

        const completeCards = cards.slice();
        while (completeCards.length < totalCardsCount) {
            completeCards.push(null);
        }
        return completeCards.map((cardModel, index) => {
            const cardType = cardModel ? CardTypeEnum[cardModel.type] : null;
            const cardValue = cardModel ? CardValueEnum[cardModel.value] : null;
            const imageFile = cardModel ? `${cardValue + cardType}.gif` : "isNull.gif";
            const cardImage = require(`../../../assets/images/cards/${imageFile}`);
            return <Image key={index} src={cardImage} alt={`card ${index + 1}`}
                          className={`${styles.card} ${cardClass}`}/>;
        });
    }

    function setCard(cardValue: string) {
        const typeKey = cardValue.slice(-1);
        const type = Object.keys(CardTypeEnum).find(key => CardTypeEnum[key as keyof typeof CardTypeEnum] === typeKey);

        const valueString = cardValue.slice(0, -1);
        const numericValue = parseInt(valueString);
        const value = Object.keys(CardValueEnum).find(key => CardValueEnum[key as keyof typeof CardValueEnum] === numericValue);

        if (type && value) {
            const newCard: CardModel = {
                type: type as keyof typeof CardTypeEnum,
                value: value as keyof typeof CardValueEnum
            };

            const cardExists: boolean = cardsMisread.some(allCards =>
                allCards.cards.some(card => card && card.type === newCard.type && card.value === newCard.value));
            const impossibleCardExists: boolean = impossibleCards.some(card => card && card.type === newCard.type && card.value === newCard.value);

            if (cardExists || impossibleCardExists) {
                toastService.pushError("Card already exists");
                return;
            }
            cardsMisread[0].cards.push(newCard);
            if (cardCountIsValid()) {
                const seatIndex: number | null = cardsMisread[0].player ? cardsMisread[0].player!.seatIndex : null;
                croupierLoadingService.setCardsMisread(roundId, seatIndex, cardsMisread[0].cards).then((roundIndfos: RoundInfosModel) => {
                    if (!roundIndfos.actionNeededInfos) {
                        finishRound(roundIndfos);
                        closeModal();
                        return;
                    }
                    setCardsMisread(roundIndfos.actionNeededInfos.cardMisreads!);
                    setImpossibleCards(roundIndfos.actionNeededInfos.impossibleCards!);
                    setCardValueView(false);
                });
            } else {
                setCardValueView(false);
            }
        } else {
            toastService.pushError("Invalid card type or value");
        }
    }

    function cardCountIsValid() {
        const {cards, player} = cardsMisread[0];
        const totalCardsCount = player == null ? 5 : 2;
        return cards.length === totalCardsCount;
    }

    const handleActiveCardType = () => {
        setCardTypeView(true);
    };

    const handleActiveCardValue = (cardType: CardTypeEnum) => {
        setCardTypeView(false);
        setCardTypeValue(cardType);
        setCardValueView(true);
    };

    const playerOrStreetLabel = () => {
        return cardsMisread && cardsMisread[0].player ? cardsMisread[0].player?.name : "BOARD";
    }

    return (
        <FettucciniModal modalIsOpen={isModalOpen} onCloseFunction={closeModal} canCloseModal={false}>
            {!cardTypeView && !cardValueView && (<Box className={styles.missReadContainer}>
                <Box className={styles.playerContainer}>
                    <Box>
                        <Text className={styles.title}>{playerOrStreetLabel()}</Text>
                    </Box>
                    <Box className={styles.cardsContainer}>
                        {getCardImages()}
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
            {cardTypeView && (<SelectCardType playerOrStreetLabel={playerOrStreetLabel()!}
                                              handleActiveCardValue={handleActiveCardValue}/>)}
            {cardValueView && (<SelectCardValue playerOrStreetLabel={playerOrStreetLabel()!} cardType={cardTypeValue!}
                                                setCard={setCard!}/>)}
        </FettucciniModal>
    );
}