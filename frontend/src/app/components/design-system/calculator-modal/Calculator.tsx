import {Button,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Box,} from '@chakra-ui/react'
import {ArrowBackIcon} from '@chakra-ui/icons'
import styles from './Calculator.module.scss'
import useCalculator from "@/app/components/design-system/calculator-modal/useCalculator";
import {CalculatorPropsModel} from "@/app/models/CalculatorProps.model";

export default function Calculator({openCalculator, closeCalculator, handleNumber}: CalculatorPropsModel) {

    const calculatorProps: CalculatorPropsModel = {
        openCalculator: openCalculator,
        closeCalculator: closeCalculator,
        handleNumber: handleNumber
    }
    const {code, handleChange, handleSubmit, handleDelete} = useCalculator(calculatorProps);

  const renderButtons = () => {
    const buttons = [];
    for (let i = 1; i <= 9; i += 3) {
      buttons.push(
        <Flex key={i} mt={2}>
          <Button id={"idButtonNumber"+i} onClick={() => handleChange(i)} className={styles.buttonNumber}>
            {i}
          </Button>
          <Button id={"idButtonNumber"+(i+1)} onClick={() => handleChange(i + 1)} className={styles.buttonNumber}>
            {i + 1}
          </Button>
          <Button id={"idButtonNumber"+(i+2)} onClick={() => handleChange(i + 2)} className={styles.buttonNumber}>
            {i + 2}
          </Button>
        </Flex>
      );
    }
    buttons.push(
      <Flex key={0} mt={2}>
        <Button id="idButtonNumber0" onClick={() => handleChange(0)} className={styles.zeroButton}>
          0
        </Button>
        <Button id="idButtonDelete" onClick={handleDelete} leftIcon={<ArrowBackIcon />} className={styles.buttonNumber}>
        </Button>
      </Flex>
    );
    return buttons;
  };

  return ( 
    <Modal isOpen={openCalculator} onClose={() => closeCalculator()} isCentered size={'sm'}>
      <ModalOverlay backdropFilter='blur(5px)' />
      <ModalContent className={styles.calculatorContent} maxW="40vw">
        <ModalCloseButton color="#F7F0E1"/>
        <ModalBody className={styles.calculatorBody}>
          <Flex direction="column" align="center">
            <Box mb={2}>
              <input id="idResult" value={code} disabled className={styles.inputCalculator}/>
            </Box>
            {renderButtons()}
            <Button id="idButtonSubmit" onClick={handleSubmit} mt={2} className={styles.submitButton}>
              Valider
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
