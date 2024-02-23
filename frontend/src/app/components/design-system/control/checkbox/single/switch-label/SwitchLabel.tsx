import { Box, Text, Switch, SwitchProps } from "@chakra-ui/react";
import styles from "./SwitchLabel.module.scss";
import { useRef } from "react";

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

  const customUpperStyle = {
    textTransform: isUpperCase ? "uppercase" : "none",
  };

  return (
    <Box className={styles.container}>
      <Box className={styles.inputLabelContainer}>
        <Text className={styles.inputLabel} style={customUpperStyle}>
          {label}
        </Text>
      </Box>
      <Box className={styles.inputContainer}>
        <Switch
          size="lg"
          value={currentValue}
          onChange={handleChange}
          isDisabled={disabled}
        />
      </Box>
    </Box>
  );
}

export default SwitchLabel;
