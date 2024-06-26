import { Box, Text, Input, InputProps } from "@chakra-ui/react";
import { GoPencil } from "react-icons/go";
import styles from "./InputLabelIconCustom.module.scss";
import commonStyles from "../styles/InputCommonStyle.module.scss";
import { CSSProperties, useRef } from "react";

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
  labelValue: string;
  handleChangeLabel: (text: string | undefined) => void;
  handleChangeCurrentValue: (text: string | undefined) => void;
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
  } = props;
  const ref = useRef();

  const handleChangeLabel = (event: any) => {
    const { handleChangeLabel } = props;
    let value;

    switch (type) {
      case types.TEXT:
      case types.NUMBER:
        value = event?.target?.value;
        break;
      default:
        value = event?.target?.value;
        break;
    }
    handleChangeLabel(value);
  };

  const handleChangeValue = (event: any) => {
    const { handleChangeCurrentValue } = props;
    let value;

    switch (type) {
      case types.TEXT:
      case types.NUMBER:
        value = event?.target?.value;
        break;
      default:
        value = event?.target?.value;
        break;
    }
    handleChangeCurrentValue(value);
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

  const customUpperStyle: CSSProperties = {
    textTransform: isUpperCase ? "uppercase" : "none",
  };

  return (
      <Box className={commonStyles.container}>
        <Box className={styles.inputLabelContainer}>
          {displayLabelIcon()}
          <Input
              data-cy="labelValue"
              ref={ref}
              value={labelValue}
              onChange={handleChangeLabel}
              textAlign={"left"}
              className={styles.inputText}
              variant="unstyled"
              isDisabled={disabled}
              type={"text"}
              sx={customUpperStyle}
              {...customInputProps}
          />
        </Box>
        <Box className={styles.inputContainer}>
          <Input
              data-cy="inputValue"
              ref={ref}
              isChecked={currentValue}
              onChange={handleChangeValue}
              textAlign={"right"}
              className={styles.inputText}
              variant="unstyled"
              isDisabled={disabled}
              type={type}
              sx={customUpperStyle}
              {...customInputProps}
          />
          <Text data-cy="customTextValue" className={commonStyles.addCustomText}>
            {customAddToText}
          </Text>
          {displayValueIcon()}
        </Box>
      </Box>
  );
}

InputLabelIconCustom.icons = icons;
InputLabelIconCustom.types = types;
InputLabelIconCustom.defaultProps = defaultProps;

export default InputLabelIconCustom;