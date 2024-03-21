import { Box, Text, Input, Button, InputProps } from "@chakra-ui/react";
import { GoPencil } from "react-icons/go";
import commonStyles from "../styles/InputCommonStyle.module.scss";
import styles from "./InputLabelIcon.module.scss";

const icons = {
  PEN: "PEN",
};
const types = {
  TEXT: "text",
  NUMBER: "number",
  BUTTON: "button",
};

const defaultProps = {
  icon: icons.PEN,
  type: types.TEXT as keyof typeof types,
};

interface InputLabelIconProps {
  // Required
  currentValue: string | number | null;
  handleChangeCurrentValue?: (value: string | number | null | any) => void;
  // Optional
  hangdleOnClick?: () => void;
  type?: (typeof types)[keyof typeof types];
  icon?: any;
  label?: string;
  isUpperCase?: boolean;
  disabled?: boolean;
  customInputProps?: InputProps;
  customAddToText?: string | null;
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
  const customUpperStyle = {
    textTransform: isUpperCase ? "uppercase" : "none",
  };
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

  const displayContent = () => {
    const { type, hangdleOnClick } = props;
    switch (type) {
      case types.TEXT:
      case types.NUMBER:
        return (
          <Input
            id_cy="inputValue"
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
        );
      case types.BUTTON:
        const baseButtonConfig = {
          size: "sm",
          width: "auto",
          variant: "ghost",
          isActive: false,
          _hover: { bg: "none" },
        };
        return (
          <Button
            onClick={hangdleOnClick}
            className={styles.buttonStyle}
            textAlign="right"
            padding={0}
            margin={0}
            {...baseButtonConfig}
          >
            <Text className={styles.textButtonStyle} style={customUpperStyle}>
              {currentValue}
            </Text>
          </Button>
        );
      default:
        return (
          <Input
            id_cy="inputValue"
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
        );
    }
  };

  return (
    <Box className={commonStyles.container}>
      <Box className={styles.inputLabelContainer}>
        <Text
          id_cy="labelValue"
          className={styles.inputLabel}
          style={customUpperStyle}
        >
          {label}
        </Text>
      </Box>
      <Box className={styles.inputContainer}>
        {displayContent()}
        <Text id_cy="customTextValue" className={commonStyles.addCustomText}>
          {customAddToText}
        </Text>
        {displayIcon()}
      </Box>
    </Box>
  );
}

InputLabelIcon.icons = icons;
InputLabelIcon.types = types;
InputLabelIcon.defaultProps = defaultProps;
export default InputLabelIcon;
