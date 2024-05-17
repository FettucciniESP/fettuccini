import { Box, Text, Switch, SwitchProps } from "@chakra-ui/react";
import styles from "./SwitchLabel.module.scss";
import {CSSProperties, useRef} from "react";

interface SwitchLabelProps {
  // Required
  currentValue: boolean;
  handleChangeCurrentValue: (value: boolean) => void;
  // Optional
  label?: string;
  isUpperCase?: boolean;
  disabled?: boolean;
  customInputProps?: SwitchProps;
}

function SwitchLabel(props: SwitchLabelProps) {
  const { label, currentValue, disabled, isUpperCase, customInputProps } =
    props;

  const handleChange = (event: any) => {
    const { handleChangeCurrentValue } = props;
    handleChangeCurrentValue(event?.target?.checked);
  };

  const customUpperStyle: CSSProperties  = {
    textTransform: isUpperCase ? "uppercase" : "none",
  };

  return (
    <Box className={styles.container}>
      <Box className={styles.inputLabelContainer}>
        <Text
          data-cy="labelValue"
          className={styles.inputLabel}
          style={customUpperStyle}
        >
          {label}
        </Text>
      </Box>
      <Box className={styles.inputContainer}>
        <Switch
          data-cy="switchValue"
          size="lg"
          isChecked={currentValue}
          onChange={handleChange}
          isDisabled={disabled}
        />
      </Box>
    </Box>
  );
}

export default SwitchLabel;
