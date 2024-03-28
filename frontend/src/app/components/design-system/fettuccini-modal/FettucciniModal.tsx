import styles from './FettucciniModal.module.scss'
import {Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay} from "@chakra-ui/modal";

export default function FettucciniModal({
                                            children,
                                            modalIsOpen,
                                            onCloseFunction,
                                            canCloseModal = true
                                        }: {
    readonly children: React.ReactNode,
    readonly modalIsOpen: boolean,
    readonly onCloseFunction: () => void,
    readonly canCloseModal?: boolean
}) {
    return <Modal closeOnOverlayClick={canCloseModal} isOpen={modalIsOpen} onClose={() => onCloseFunction()} isCentered size={'sm'}>
        <ModalOverlay backdropFilter='blur(5px)'/>
        <ModalContent className={styles.calculatorContent} maxW="40vw">
            {canCloseModal && ( <ModalCloseButton color="#F7F0E1"/> )}
            <ModalBody className={styles.calculatorBody}>
                {children}
            </ModalBody>
        </ModalContent>
    </Modal>
}
