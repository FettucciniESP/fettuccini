import FettucciniModal from "@/app/components/design-system/fettuccini-modal/FettucciniModal";
import {Box, Button, Icon, Text} from "@chakra-ui/react";
import styles from "./SeatsSelection.module.scss";
import {HiMiniPlusCircle} from "react-icons/hi2";
import FettucciniContainer from "@/app/components/design-system/fettuccini-container/FettucciniContainer";
import {VariantStyleEnum} from "@/app/enums/VariantStyle.enum";

export default function SeatsSelection({modalIsOpen, onCloseFunction, seatsIndex, handleChangeSeatsIndex}: {
    modalIsOpen: boolean,
    onCloseFunction: () => void,
    seatsIndex: Array<number>,
    handleChangeSeatsIndex: (value: Array<number>) => void

}) {

    const handleClickOnSeat = (seatIndex: number) => {
        if (seatsIndex.includes(seatIndex)) {
            const newSeatsIndex = seatsIndex.filter(seat => seat !== seatIndex);
            handleChangeSeatsIndex(newSeatsIndex);
        } else {
            const newSeatsIndex = [...seatsIndex, seatIndex];
            handleChangeSeatsIndex(newSeatsIndex);
        }
    }

    return (
        <FettucciniModal modalIsOpen={modalIsOpen} onCloseFunction={onCloseFunction}>
            <Text className={styles.title}>Sélection des sièges</Text>
            <Box className={styles.informationPanel}>
                <Box className={styles.topInformationPanel}>
                    <Box className={styles.fettucciniContainer}>
                        <FettucciniContainer variantStyle={VariantStyleEnum.DEFAULT}>
                            <Text className={styles.seatLabel}>Siège 2</Text>
                            <Button className={styles.seatButtonIcon} onClick={() => handleClickOnSeat(2)}><Icon
                                as={HiMiniPlusCircle}/></Button>
                        </FettucciniContainer>
                    </Box>
                    <Box className={styles.fettucciniContainer}>
                        <FettucciniContainer variantStyle={VariantStyleEnum.DEFAULT}>
                            <Text className={styles.seatLabel}>Siège 3</Text>
                            <Button className={styles.seatButtonIcon} onClick={() => handleClickOnSeat(3)}><Icon
                                as={HiMiniPlusCircle}/></Button>
                        </FettucciniContainer>
                    </Box>
                    <Box className={styles.fettucciniContainer}>
                        <FettucciniContainer variantStyle={VariantStyleEnum.DEFAULT}>
                            <Text className={styles.seatLabel}>Siège 4</Text>
                            <Button className={styles.seatButtonIcon} onClick={() => handleClickOnSeat(4)}><Icon
                                as={HiMiniPlusCircle}/></Button>
                        </FettucciniContainer>
                    </Box>
                    <Box className={styles.fettucciniContainer}>
                        <FettucciniContainer variantStyle={VariantStyleEnum.DEFAULT}>
                            <Text className={styles.seatLabel}>Siège 5</Text>
                            <Button className={styles.seatButtonIcon} onClick={() => handleClickOnSeat(5)}><Icon
                                as={HiMiniPlusCircle}/></Button>
                        </FettucciniContainer>
                    </Box>
                </Box>
                <Box className={styles.bottomInformationPanel}>
                    <Box className={styles.fettucciniContainer}>
                        <FettucciniContainer variantStyle={VariantStyleEnum.DEFAULT}>
                            <Text className={styles.seatLabel}>Siège 1</Text>
                            <Button className={styles.seatButtonIcon} onClick={() => handleClickOnSeat(1)}><Icon
                                as={HiMiniPlusCircle}/></Button>
                        </FettucciniContainer>
                    </Box>
                    <Box className={styles.fettucciniContainer}>
                        <FettucciniContainer variantStyle={VariantStyleEnum.DEFAULT}>
                            <Text className={styles.seatLabel}>Siège 6</Text>
                            <Button className={styles.seatButtonIcon} onClick={() => handleClickOnSeat(6)}><Icon
                                as={HiMiniPlusCircle}/></Button>
                        </FettucciniContainer>
                    </Box>
                </Box>
            </Box>
        </FettucciniModal>
    )
}