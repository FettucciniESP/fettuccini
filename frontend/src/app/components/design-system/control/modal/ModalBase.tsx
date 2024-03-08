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
  children?: any;
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

const backgroundBlur = {
  backdropFilter: "blur(3px)",
};

const exitStyle = {
  zIndex: 1000,
  position: "absolute",
  top: "-15%",
  right: "-15%",
  transform: "rotate(45deg)",
  color: "#fff",
};

function ModalBase(props: ModalBaseProps) {
  const { isOpen, children, handleCloseModal } = props;

  const handleOpen = () => handleCloseModal(true);
  const handleClose = () => handleCloseModal(false);

  return (
    <Box style={{ position: "relative" }}>
      <Modal onClose={handleClose} isOpen={isOpen} size={""}>
        <ModalOverlay style={{ ...backgroundBlur }} />
        <ModalContent style={{ ...baseModalContainerStyle, ...backgroundBlur }}>
          <Box
            onClick={handleClose}
            style={{
              ...exitStyle,
            }}
          >
            <BsPlusLg size={30} color="#fff" />
          </Box>
          <ModalBody>{children}</ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default ModalBase;
