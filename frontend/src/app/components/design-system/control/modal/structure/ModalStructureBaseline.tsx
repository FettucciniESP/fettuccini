import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import ModalBase from "../ModalBase";
import { Titles } from "../../../../../enums/Titles.enum";
import InputLabelIcon from "../../inputs/input-label/InputLabelIcon";
import { ButtonLabels, InputLabels } from "../../../../../enums/Labels.enum";
import ButtonIcon from "../../buttons/button-icon/ButtonIcon";
import styles from "./ModalStructure.module.scss";
interface ModalBaseProps {
  isOpen: boolean;
  handleCloseModal: (bool: boolean) => void;
}
function ModalStructureBaseline(props: ModalBaseProps) {
  const { isOpen, handleCloseModal } = props;
  const [structure, setStructure] = useState<any>([]);

  const hangdleOnClickContinueButton = () => {};

  const handleClickButtonLoad = () => {};
  const handleClickButtonSave = () => {};
  const handleClickButtonContinue = () => {};

  const renderInputStructure = (): any => {
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
        if (!!breakDuration && !!breakName) {
          inputValue = `${breakName} : ${breakDuration} `;
        } else {
          inputValue = `${smallBlind} | ${bigBlind} | ${ante} | ${duration}`;
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

  const renderButtonSection = () => {
    return (
      <Box className={styles.buttonSectionContainer}>
        <ButtonIcon
          label={ButtonLabels.LOAD}
          handleClick={handleClickButtonLoad}
          icon={ButtonIcon.icons.LOAD}
          customStyle={ButtonIcon.customStyles.SETTING_STRUCTURE}
        />
        <ButtonIcon
          label={ButtonLabels.SAVE}
          handleClick={handleClickButtonSave}
          icon={ButtonIcon.icons.SAVE}
          customStyle={ButtonIcon.customStyles.SETTING_STRUCTURE}
        />
        <ButtonIcon
          label={ButtonLabels.CONTINUE}
          icon={ButtonIcon.icons.PLAY}
          handleClick={handleClickButtonContinue}
          customStyle={ButtonIcon.customStyles.SETTING_STRUCTURE}
        />
      </Box>
    );
  };

  return (
    <ModalBase
      modalTitle={Titles.STRUCTURE_MODAL}
      isOpen={isOpen}
      handleCloseModal={handleCloseModal}
    >
      <Box>{renderInputStructure()}</Box>
      <Box className={styles.buttonContainer}>{renderButtonSection()}</Box>
    </ModalBase>
  );
}

export default ModalStructureBaseline;
