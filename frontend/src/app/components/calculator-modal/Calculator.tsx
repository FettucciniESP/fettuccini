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
import { useState } from 'react';

export default function Calculator() {
    const [isOpen, setIsOpen] = useState(true);
    const [code, setCode] = useState("");
  
    const handleChange = (value: number) => {
      setCode(code + value);
    };
  
    const handleSubmit = () => {
      setIsOpen(false);
    };

    const handleDelete = () => {
      setCode(code.slice(0, -1));
    };

    const renderButtons = () => {
      const buttons = [];
      for (let i = 1; i <= 9; i += 3) {
        buttons.push(
          <Flex key={i} mt={2}>
            <Button onClick={() => handleChange(i)} mr={2} className={styles.ButtonNumber}>
              {i}
            </Button>
            <Button onClick={() => handleChange(i + 1)} mr={2} className={styles.ButtonNumber}>
              {i + 1}
            </Button>
            <Button onClick={() => handleChange(i + 2)} className={styles.ButtonNumber}>
              {i + 2}
            </Button>
          </Flex>
        );
      }
      buttons.push(
        <Flex key={0} mt={2}>
          <Button onClick={() => handleChange(0)} mr={10}  className={styles.ButtonNumber}>
            0
          </Button>
          <Button onClick={handleDelete} leftIcon={<ArrowBackIcon />} className={styles.ButtonNumber}>
          </Button>
        </Flex>
      );
      return buttons;
    };

    return ( 
      <Box p={4}>
      <Button colorScheme="blue" onClick={() => setIsOpen(true)}>
        Ouvrir la calculette
      </Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent className={styles.CalculatorContent}>
          <ModalCloseButton color="#F7F0E1"/>
          <ModalBody className={styles.CalculatorBody}>
            <Flex direction="column" align="center">
              <Box mb={4}>
                <input value={code} disabled className={styles.inputCalculator}/>
              </Box>
              {renderButtons()}
              <Button onClick={handleSubmit} mt={4} className={styles.ButtonSubmit}>
                Valider
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};
