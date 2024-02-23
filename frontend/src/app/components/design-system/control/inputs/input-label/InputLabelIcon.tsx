import { Box, Text, Input, InputProps } from "@chakra-ui/react";
import { GoPencil } from "react-icons/go";
import styles from "./InputLabelIcon.module.scss";
import commonStyles from "../styles/InputCommonStyle.module.scss";
import { useRef } from "react";

const icons = {
  PEN: "PEN",
};
const types = {
  TEXT: "text",
  NUMBER: "number",
};

const defaultProps = {
  icon: icons.PEN,
  type: types.TEXT as keyof typeof types,
};

interface InputLabelIconProps {
  // Required
  currentValue: string;
  handleChangeCurrentValue: (text: string | undefined) => void;
  // Optional
  type?: (typeof types)[keyof typeof types];
  icon?: any;
  label?: string;
  isUpperCase?: boolean;
  disabled?: boolean;
  customInputProps?: InputProps;
  customAddToText?: any;
}

function InputLabelIcon(props: InputLabelIconProps) {
  const {
    type,
    label,
    currentValue,
    disabled,
    isUpperCase,
    customInputProps,
    customAddToText,
  } = props;
  const ref = useRef();
  const handleChange = (event: any) => {
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

  const displayIcon = () => {
    const { icon } = props;
    let currentIcon;

    const config = {
      className: styles.iconStyle,
      size: 25,
      color: "#fff",
    };

    if (icon) {
      switch (icon) {
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

  const customUpperStyle = {
    textTransform: isUpperCase ? "uppercase" : "none",
  };

  return (
    <Box className={commonStyles.container}>
      <Box className={styles.inputLabelContainer}>
        <Text className={styles.inputLabel} style={customUpperStyle}>
          {label}
        </Text>
      </Box>
      <Box className={styles.inputContainer}>
        <Input
          ref={ref}
          value={currentValue}
          onChange={handleChange}
          textAlign={"right"}
          className={styles.inputText}
          variant="unstyled"
          isDisabled={disabled}
          type={type}
          {...customInputProps}
          {...customUpperStyle}
        />
        <Text className={commonStyles.addCustomText}>{customAddToText}</Text>
        {displayIcon()}
      </Box>
    </Box>
  );
}

InputLabelIcon.icons = icons;
InputLabelIcon.types = types;
InputLabelIcon.defaultProps = defaultProps;

export default InputLabelIcon;
