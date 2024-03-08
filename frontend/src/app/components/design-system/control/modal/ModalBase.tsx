import { useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import {
  Modal,
  Box,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Text,
} from "@chakra-ui/react";
import styles from "./ModalBase.module.scss";

interface ModalBaseProps {
  isOpen: boolean;
  handleCloseModal: (bool: boolean) => void;
  children: any;
}

// Cannot specified in css file, cause it doesn't work
const baseModalContainerStyle = {
  height: "70vh",
  width: "70%",
  alignSelf: "center",
  position: "relative",
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  borderRadius: "30px",
};

const exitStyle = {
  position: "absolute",
  top: 0,
  right: 0,
  transform: "rotate(45deg)",
  color: "#fff",
};

function ModalBase(props: ModalBaseProps) {
  const { isOpen, children, handleCloseModal } = props;

  const handleOpen = () => handleCloseModal(true);
  const handleClose = () => handleCloseModal(false);

  return (
    <Box style={{ position: "relative" }}>
      <Box
        onClick={handleClose}
        style={{
          ...exitStyle,
        }}
      >
        <BsPlusLg size={30} color="#fff" />
      </Box>
      <Modal onClose={handleClose} isOpen={isOpen} size={""}>
        <ModalOverlay />
        <ModalContent style={{ ...baseModalContainerStyle }}>
          <ModalBody>{children}</ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default ModalBase;
