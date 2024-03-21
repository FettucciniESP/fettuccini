import { Box, Text } from "@chakra-ui/react";
import { useState } from "react";
import {
  InputLabels,
  ButtonLabels,
  InputEndTextLabels,
} from "@/app/enums/Labels.enum";
import { Titles } from "@/app/enums/Titles.enum";

import InputLabelIcon from "@/app/components/design-system/control/inputs/input-label/InputLabelIcon";
import styles from "@/app/assets/styles/setting-lobby.module.scss";
import ButtonIcon from "@/app/components/design-system/control/buttons/button-icon/ButtonIcon";
import ModalStructure from "@/app/components/design-system/control/modal/structure/ModalStructure";

export default function SettingLobby() {
  const [isSettingDone, setIsSettingDone] = useState<boolean>(false);
  const [isModalOpen, setIsOpenModal] = useState<boolean>(true);
  const [stucture, setStructure] = useState<null | string>(null);
  const [stacks, setStacks] = useState<null | string>(null);
  const [registrationMax, setRegistrationMax] = useState<null | string>(null);
  const [costEntry, setCostEntry] = useState<null | string>(null);
  // const [multiTable, setMultiTable] = useState(false);

  const handleChangeStructure = (value: string): void => {
    setStructure(value);
  };
  const handleChangeStacks = (value: number): void => {
    setStacks(value);
  };
  const handleChangeRegistrationMax = (value: string): void => {
    setRegistrationMax(value);
  };
  // const handleChangesetMultiTable = (value: boolean): void => {
  //   setMultiTable(value);
  // };
  const handleChangeCostEntry = (value: number): void => {
    setCostEntry(value);
  };
  const hangdleOnClickButtonStructure = () => {
    setIsOpenModal(!isModalOpen);
    // handleChangeStructure("TEST STRUCTURE");
  };
  const hangdleOnClickButtonRegistration = () => {
    console.log("registration open modal");
    handleChangeRegistrationMax("TEST REGISTRATION");
  };
  const hangdleOnClickButtonLoad = () => {
    console.log("load button");
  };
  const hangdleOnClickButtonSave = () => {
    console.log("save button");
  };
  const hangdleOnClickButtonStart = () => {
    console.log("start button");
  };
  const handleChangeModalStatus = (bool: boolean) => {
    setIsOpenModal(bool);
  };

  const renderInputContent = () => {
    return (
      <Box className={styles.inputContainer}>
        <InputLabelIcon
          label={InputLabels.STRUCTURE}
          hangdleOnClick={hangdleOnClickButtonStructure}
          currentValue={stucture}
          type={InputLabelIcon.types.BUTTON}
          isUpperCase
        />

        <InputLabelIcon
          label={InputLabels.STACKS}
          handleChangeCurrentValue={handleChangeStacks}
          currentValue={stacks}
          type={InputLabelIcon.types.NUMBER}
        />

        <InputLabelIcon
          label={InputLabels.REGISTRATION_MAX}
          hangdleOnClick={hangdleOnClickButtonRegistration}
          currentValue={registrationMax}
          type={InputLabelIcon.types.BUTTON}
        />

        {/* <SwitchLabel
            label={InputLabels.MULTI_TABLE}
            handleChangeCurrentValue={handleChangesetMultiTable}
            currentValue={multiTable}
          /> */}

        <InputLabelIcon
          label={InputLabels.COST_ENTRY}
          handleChangeCurrentValue={handleChangeCostEntry}
          currentValue={costEntry}
          type={InputLabelIcon.types.NUMBER}
          customAddToText={"€"}
        />
      </Box>
    );
  };
  const renderSettingContent = () => {
    return (
      <Box className={styles.sectionContainer}>
        <Text className={styles.titleSection}>
          {Titles.SETTING_LOBBY_TITLE_SECTION}
        </Text>
        <Box className={styles.settingSectionContainer}>
          {renderSettingsSection()}
        </Box>
        <Box className={styles.buttonSectionContainer}>
          {renderButtonSection()}
        </Box>
      </Box>
    );
  };
  const renderSettingsSection = () => {
    const sectionContent = [
      { title: InputLabels.STRUCTURE, value: stucture },
      { title: InputLabels.STACKS, value: stacks },
      { title: InputLabels.REGISTRATION_MAX, value: registrationMax },
      {
        title: InputLabels.COST_ENTRY,
        value: costEntry
          ? `${costEntry} ${InputEndTextLabels.EURO}}`
          : costEntry,
      },
    ];

    return (
      <Box>
        {sectionContent.map((element, i) => {
          return (
            <Box className={styles.textContainer} key={i}>
              <Text className={styles.textSetting}>{element.title}</Text>
              <Text className={styles.textSetting}>{element.value}</Text>
            </Box>
          );
        })}
      </Box>
    );
  };
  const renderButtonSection = () => {
    return (
      <Box>
        <Box className={styles.singleButtonContainer}>
          <ButtonIcon
            label={ButtonLabels.LOAD}
            hangdleOnClick={hangdleOnClickButtonLoad}
            customStyle={ButtonIcon.customStyles.SETTING_LOBBY}
            icon={ButtonIcon.icons.LOAD}
          />
          <ButtonIcon
            label={ButtonLabels.SAVE}
            hangdleOnClick={hangdleOnClickButtonSave}
            customStyle={ButtonIcon.customStyles.SETTING_LOBBY}
            icon={ButtonIcon.icons.SAVE}
          />
        </Box>
        <Box className={styles.multiButtonContainer}>
          <ButtonIcon
            label={ButtonLabels.START}
            customStyle={ButtonIcon.customStyles.SETTING_LOBBY}
            hangdleOnClick={hangdleOnClickButtonStart}
          />
        </Box>
      </Box>
    );
  };

  return (
    <Box className={styles.mainContainer}>
      {isModalOpen ? (
        <ModalStructure
          isOpen={isModalOpen}
          handleCloseModal={handleChangeModalStatus}
        />
      ) : null}
      <Box>
        <Text className={styles.titlePage}>
          {Titles.SETTING_LOBBY_TITLE_PAGE}
        </Text>
      </Box>
      <Box className={styles.mainSettingContainer}>
        <Box className={styles.settingContainer}>
          {renderInputContent()}
          {renderSettingContent()}
        </Box>
      </Box>
    </Box>
  );
}
