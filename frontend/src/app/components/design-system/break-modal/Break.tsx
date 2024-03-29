import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
} from '@chakra-ui/react';
import TimeRemaining from "../../information-panel/time-remaining/TimeRemaining";

export default function Break(title: string, isOpen: boolean, isClose: () => void) {
    return (
        <>
            <Modal isOpen={isOpen} onClose={isClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{title}</ModalHeader>
                    <ModalBody>
                        <TimeRemaining/>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}