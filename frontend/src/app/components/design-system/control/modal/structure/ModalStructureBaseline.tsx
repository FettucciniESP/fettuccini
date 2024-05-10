import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import ModalBase from "../ModalBase";
import { Titles } from "../../../../../enums/Titles.enum";
import InputLabelIcon from "../../inputs/input-label/InputLabelIcon";
import {
  ButtonLabels,
  InputLabels,
  InputEndTextLabels,
} from "../../../../../enums/Labels.enum";

interface ModalBaseProps {
  isOpen: boolean;
  handleCloseModal: (bool: boolean) => void;
}
function ModalStructureBaseline(props: ModalBaseProps) {
  const { isOpen, handleCloseModal } = props;
  const [structure, setStructure] = useState<any>([]);

  const hangdleOnClickContinueButton = () => {};

  const renderInputStructure = () => {
    structure &&
      structure.map((item: any, index: number) => {
        const {
          smallBlind,
          bigBlind,
          ante,
          duration,
          breakName,
          breakDuration,
        } = item;

        let inputValue = "";
        if (!breakDuration || !breakName) {
          inputValue = `${breakName} : ${breakDuration} `;
        } else {
          inputValue = `${smallBlind} | ${bigBlind} | ${ante} | ${}`
        }
        return (
          <InputLabelIcon
            key={index}
            label={InputLabels.SMALL_BLIND}
            handleChangeCurrentValue={() =>
              console.log("handleChangeCurrentValue")
            }
            currentValue={inputValue}
            type={InputLabelIcon.types.BUTTON}
            isUpperCase
          />
        );
      });
  };

  return (
    <ModalBase
      modalTitle={Titles.STRUCTURE_MODAL}
      isOpen={isOpen}
      handleCloseModal={handleCloseModal}
    >
      <Box>
        <InputLabelIcon
          label={InputLabels.SMALL_BLIND}
          handleChangeCurrentValue={() =>
            console.log("handleChangeCurrentValue")
          }
          currentValue={smallBlind}
          type={InputLabelIcon.types.NUMBER}
          isUpperCase
        />
      </Box>
    </ModalBase>
  );
}

export default ModalStructureBaseline;
