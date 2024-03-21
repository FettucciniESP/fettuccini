import React, { useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import styles from "./ModalStructure.module.scss";
import ModalBase from "../ModalBase";
import InputLabelIcon from "../../inputs/input-label/InputLabelIcon";
import SwitchLabel from "../../checkbox/single/switch-label/SwitchLabel";
import InputLabelIconCustom from "../../inputs/input-label-custom/InputLabelIconCustom";
import ButtonIcon from "../../buttons/button-icon/ButtonIcon";
import {
  ButtonLabels,
  InputLabels,
  InputEndTextLabels,
} from "../../../../../enums/Labels.enum";
import { Titles } from "../../../../../enums/Titles.enum";

interface ModalBaseProps {
  isOpen: boolean;
  handleCloseModal: (bool: boolean) => void;
}
function ModalStructure(props: ModalBaseProps) {
  const { isOpen, handleCloseModal } = props;

  const handleOpen = () => handleCloseModal(true);
  const handleClose = () => handleCloseModal(false);

  const [isBreak, setIsBreak] = useState<boolean>(false);
  const [smallBlind, setSmallBlind] = useState<number | null>(null);
  const [bigBlind, setBigBlind] = useState<number | null>(null);
  const [ante, setAnte] = useState<number | null>(null);
  const [duration, setDuration] = useState<number | null>(null);
  const [breakName, setBreakName] = useState<string | null>(null);
  const [breakDuration, setBreakDuration] = useState<number | null>(null);

  const handleChangeIsBreak = (value: boolean): void => {
    value ? (setBreakName(null), setBreakDuration(null)) : null;
    setIsBreak(value);
  };
  const handleChangeSmallBlind = (value: number | null): void => {
    setSmallBlind(value);
  };
  const handleChangeBigBlind = (value: number | null): void => {
    setBigBlind(value);
  };
  const handleChangeAnte = (value: number | null): void => {
    setAnte(value);
  };
  const handleChangeDuration = (value: number | null): void => {
    setDuration(value);
  };

  const handleChangeBreakName = (value: string | null): void => {
    setBreakName(value);
  };
  const handleChangeBreakDuration = (value: number | null): void => {
    setBreakDuration(value);
  };

  const renderSettingLobby = () => {
    return (
      <Box>
        <InputLabelIcon
          label={InputLabels.SMALL_BLIND}
          handleChangeCurrentValue={handleChangeSmallBlind}
          currentValue={smallBlind}
          type={InputLabelIcon.types.NUMBER}
          isUpperCase
        />

        <InputLabelIcon
          label={InputLabels.BIG_BLIND}
          handleChangeCurrentValue={handleChangeBigBlind}
          currentValue={bigBlind}
          type={InputLabelIcon.types.NUMBER}
          isUpperCase
        />

        <InputLabelIcon
          label={InputLabels.ANTE}
          handleChangeCurrentValue={handleChangeAnte}
          currentValue={ante}
          type={InputLabelIcon.types.NUMBER}
          isUpperCase
        />

        <InputLabelIcon
          label={InputLabels.DURATION}
          handleChangeCurrentValue={handleChangeDuration}
          currentValue={duration}
          type={InputLabelIcon.types.NUMBER}
          customAddToText={InputEndTextLabels.MIN}
          isUpperCase
        />
      </Box>
    );
  };

  const renderSettingBreak = () => {
    return (
      <InputLabelIconCustom
        handleChangeLabel={handleChangeBreakName}
        handleChangeCurrentValue={handleChangeBreakDuration}
        iconLabel={InputLabelIconCustom.icons.PEN}
        iconValue={InputLabelIconCustom.icons.PEN}
        labelValue={breakName}
        currentValue={breakDuration}
        type={InputLabelIcon.types.NUMBER}
        customAddToText={"MIN"}
        isUpperCase
      />
    );
  };

  const renderButtonSettingLobby = () => {
    return (
      <Box className={styles.buttonSettingContainer}>
        <ButtonIcon
          label={ButtonLabels.LOAD}
          hangdleOnClick={() => console.log("load")}
          icon={ButtonIcon.icons.LOAD}
          customStyle={ButtonIcon.customStyles.SETTING_STRUCTURE}
        />
        <ButtonIcon
          label={ButtonLabels.SAVE}
          hangdleOnClick={() => console.log("save")}
          icon={ButtonIcon.icons.SAVE}
          customStyle={ButtonIcon.customStyles.SETTING_STRUCTURE}
        />
        <ButtonIcon
          label={ButtonLabels.CONTINUE}
          hangdleOnClick={() => console.log("continue")}
          icon={ButtonIcon.icons.PLAY}
          customStyle={ButtonIcon.customStyles.SETTING_STRUCTURE}
        />
      </Box>
    );
  };

  const renderButtonSettingBreak = () => {
    return (
      <Box className={styles.buttonSettingContainer}>
        <ButtonIcon
          label={ButtonLabels.CONTINUE}
          hangdleOnClick={() => console.log("continue")}
          icon={ButtonIcon.icons.PLAY}
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
      <Box>
        <SwitchLabel
          label={InputLabels.BREAK}
          handleChangeCurrentValue={handleChangeIsBreak}
          currentValue={isBreak}
        />
        {isBreak ? renderSettingBreak() : renderSettingLobby()}
        {isBreak ? renderButtonSettingBreak() : renderButtonSettingLobby()}
      </Box>
    </ModalBase>
  );
}

export default ModalStructure;
