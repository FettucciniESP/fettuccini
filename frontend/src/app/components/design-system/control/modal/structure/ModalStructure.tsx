import { Text } from "@chakra-ui/react";
import styles from "./ModalStructure.module.scss";
import ModalBase from "../ModalBase";

interface ModalBaseProps {
  isOpen: boolean;
  handleCloseModal: (bool: boolean) => void;
}

function ModalStructure(props: ModalBaseProps) {
  const { isOpen, handleCloseModal } = props;

  const handleOpen = () => handleCloseModal(true);
  const handleClose = () => handleCloseModal(false);

  return (
    <ModalBase isOpen={isOpen} handleCloseModal={handleCloseModal}>
      <Text>Hello</Text>
    </ModalBase>
  );
}

export default ModalStructure;
