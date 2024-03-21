import { BsPlusLg } from "react-icons/bs";
import "../../../../assets/styles/variables.scss";
import {
  Modal,
  Box,
  Text,
  ModalOverlay,
  ModalContent,
  ModalBody,
} from "@chakra-ui/react";

import {
  baseModalContainerStyle,
  backgroundBlur,
  exitStyle,
  modalTitleContainerStyle,
  modalTitleStyle,
  iconExitStyle,
} from "./ModalBaseStyle";

interface ModalBaseProps {
  isOpen: boolean;
  handleCloseModal: (bool: boolean) => void;
  children?: any;
  modalTitle?: string;
}

// Cannot specified in css file, cause it doesn't work

function ModalBase(props: ModalBaseProps) {
  const { isOpen, children, modalTitle, handleCloseModal } = props;

  const handleOpen = () => handleCloseModal(true);
  const handleClose = () => handleCloseModal(false);

  return (
    <Box style={{ position: "relative" }}>
      <Modal onClose={handleClose} isOpen={isOpen} size={""}>
        <ModalOverlay style={{ ...backgroundBlur }} />
        <ModalContent style={{ ...baseModalContainerStyle, ...backgroundBlur }}>
          <Box>
            {modalTitle && (
              <Box style={{ ...modalTitleContainerStyle }}>
                <Text style={{ ...modalTitleStyle }}>{modalTitle}</Text>
              </Box>
            )}
            <Box
              onClick={handleClose}
              style={{
                ...exitStyle,
              }}
            >
              <BsPlusLg {...iconExitStyle} />
            </Box>
          </Box>

          <ModalBody>{children}</ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default ModalBase;
