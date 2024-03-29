import { Box, Text, Input, InputProps } from "@chakra-ui/react";
import { GoPencil } from "react-icons/go";
import styles from "./InputLabelIconCustom.module.scss";
import commonStyles from "../styles/InputCommonStyle.module.scss";
import KeyboardComponent from "../../Keyboard/Keyboard";
import { useState } from "react";

const icons = {
  PEN: "PEN",
};
const types = {
  TEXT: "text",
  NUMBER: "number",
};

const defaultProps = {
  type: types.TEXT as keyof typeof types,
};

interface InputLabelIconCustomProps {
  // Required
  currentValue: string | number | null;
  labelValue: string | null;
  handleChangeLabel: (text: string | number | null | any) => void;
  handleChangeCurrentValue: (text: string | number | null | any) => void;
  // Optional
  type?: (typeof types)[keyof typeof types];
  iconValue?: any;
  iconLabel?: any;
  isUpperCase?: boolean;
  disabled?: boolean;
  customInputProps?: InputProps;
  customAddToText?: any;
}

function InputLabelIconCustom(props: InputLabelIconCustomProps) {
  const {
    currentValue,
    labelValue,
    type,
    disabled,
    isUpperCase,
    customInputProps,
    customAddToText,
    handleChangeLabel,
    handleChangeCurrentValue,
  } = props;
  const [openKeyboardLabel, setOpenKeyboardLabel] = useState(false);
  const [openKeyboardValue, setOpenKeyboardValue] = useState(false);

  // const handleChangeValue = (event: any) => {
  //   const { handleChangeCurrentValue } = props;
  //   let value;

  //   switch (type) {
  //     case types.TEXT:
  //     case types.NUMBER:
  //       value = event?.target?.value;
  //       break;
  //     default:
  //       value = event?.target?.value;
  //       break;
  //   }
  //   handleChangeCurrentValue(value);
  // };

  const handleClickKeyBoardLabel = () => {
    setOpenKeyboardLabel(true);
  };

  const handleClickKeyboardValue = () => {
    setOpenKeyboardValue(true);
  };

  const handleConfirmLabel = (value: string | number | null) => {
    const { handleChangeLabel } = props;
    handleChangeLabel(value);
    setOpenKeyboardLabel(false);
  };

  const handleConfirmValue = (value: string | number | null) => {
    const { handleChangeCurrentValue } = props;
    handleChangeCurrentValue(value);
    setOpenKeyboardValue(false);
  };

  const displayLabelIcon = () => {
    const { iconLabel } = props;
    let currentIcon;

    const config = {
      className: styles.iconLabelStyle,
      size: 24,
      color: "#fff",
    };

    if (iconLabel) {
      switch (iconLabel) {
        case icons.PEN:
          currentIcon = <GoPencil {...config} />;
          break;
        default:
          currentIcon = <GoPencil {...config} />;
          break;
      }
    }

    return currentIcon;
  };
  const displayValueIcon = () => {
    const { iconValue } = props;
    let currentIcon;

    const config = {
      className: styles.iconValueStyle,
      size: 25,
      color: "#fff",
    };

    if (iconValue) {
      switch (iconValue) {
        case icons.PEN:
          currentIcon = <GoPencil {...config} />;
          break;
        default:
          currentIcon = <GoPencil {...config} />;
          break;
      }
    }

    return currentIcon;
  };

  const renderKeyboardLabel = () => {
    return (
      <Box className={styles.keyboard}>
        <KeyboardComponent
          openKeyboard={openKeyboardLabel}
          currentValue={labelValue}
          handleKeyboard={setOpenKeyboardLabel}
          confirmValue={handleConfirmLabel}
          type={KeyboardComponent.types.CUSTOM}
        />
      </Box>
    );
  };

  const renderKeyboardLabelValue = () => {
    return (
      <Box className={styles.keyboard}>
        <KeyboardComponent
          openKeyboard={openKeyboardValue}
          currentValue={currentValue}
          handleKeyboard={setOpenKeyboardValue}
          confirmValue={handleConfirmValue}
          type={
            type == types.NUMBER
              ? KeyboardComponent.types.NUMBER
              : KeyboardComponent.types.BASE
          }
        />
      </Box>
    );
  };

  const customUpperStyle = {
    textTransform: isUpperCase ? "uppercase" : "none",
  };
  return (
    <>
      {openKeyboardLabel && renderKeyboardLabel()}
      {openKeyboardValue && renderKeyboardLabelValue()}
      <Box className={commonStyles.container}>
        <Box className={styles.inputLabelContainer}>
          {displayLabelIcon()}
          <Input
            id_cy="labelValue"
            value={labelValue}
            onChange={handleChangeLabel}
            onClick={handleClickKeyBoardLabel}
            textAlign={"left"}
            className={styles.inputText}
            variant="unstyled"
            isDisabled={disabled}
            type={"text"}
            {...customInputProps}
            {...customUpperStyle}
          />
        </Box>
        <Box className={styles.inputContainer}>
          <Input
            id_cy="inputValue"
            value={currentValue}
            onChange={handleChangeCurrentValue}
            onClick={handleClickKeyboardValue}
            textAlign={"right"}
            className={styles.inputText}
            variant="unstyled"
            isDisabled={disabled}
            type={type}
            {...customInputProps}
            {...customUpperStyle}
          />
          <Text id_cy="customTextValue" className={commonStyles.addCustomText}>
            {customAddToText}
          </Text>
          {displayValueIcon()}
        </Box>
      </Box>
    </>
  );
}

InputLabelIconCustom.icons = icons;
InputLabelIconCustom.types = types;
InputLabelIconCustom.defaultProps = defaultProps;
export default InputLabelIconCustom;
