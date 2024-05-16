import {Box, Button, Icon, Text} from "@chakra-ui/react";
import styles from "./SelectCardType.module.scss";
import {ImClubs, ImDiamonds, ImHeart, ImSpades} from "react-icons/im";
import { IoMdArrowRoundBack } from "react-icons/io";
import {CardTypeEnum} from "@/app/enums/CardType.enum";

export default function SelectCardType({
                                           playerOrStreetLabel,
                                           handleActiveCardValue,
                                           backFunction,
                                       }: {
    playerOrStreetLabel: string,
    handleActiveCardValue: (cardType: CardTypeEnum) => void,
    backFunction: () => void,
}) {

    return (
        <Box className={styles.selectCardTypeContainer}>
            <Box>
                <Text className={styles.title}>Veuillez choisir la couleur de la carte utilisée</Text>
            </Box>
            <Box className={styles.buttonsContainer}>
                <Button onClick={() => handleActiveCardValue(CardTypeEnum.SPADES)}><Icon as={ImSpades}/></Button>
                <Button onClick={() => handleActiveCardValue(CardTypeEnum.HEARTS)}><Icon className={styles.redIcon} as={ImHeart}/></Button>
                <Button onClick={() => handleActiveCardValue(CardTypeEnum.CLUBS)}><Icon as={ImClubs}/></Button>
                <Button onClick={() => handleActiveCardValue(CardTypeEnum.DIAMONDS)}><Icon className={styles.redIcon} as={ImDiamonds}/></Button>
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