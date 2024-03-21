import { Box, Text, Switch, SwitchProps } from "@chakra-ui/react";
import styles from "./SwitchLabel.module.scss";

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
  const { label, currentValue, disabled, isUpperCase } = props;

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
        <Text
          id_cy="labelValue"
          className={styles.inputLabel}
          style={customUpperStyle}
        >
          {label}
        </Text>
      </Box>
      <Box className={styles.inputContainer}>
        <Switch
          id_cy="switchValue"
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
