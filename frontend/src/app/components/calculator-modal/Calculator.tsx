import {Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,} from '@chakra-ui/react'
import styles from './FettucciniContainer.module.scss'
import {VariantStyleEnum} from "@/app/enums/VariantStyle.enum";

export default function Calculator() {


    return ( 
    <Modal isOpen={} onClose={}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Modal Title</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        Ich bin ein loremIPSUM
      </ModalBody>

      <ModalFooter>
        <Button colorScheme='blue' mr={3} onClick={}>
          Close
        </Button>
        <Button variant='ghost'>Secondary Action</Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
  )
}
