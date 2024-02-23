import { Box, Text } from "@chakra-ui/react";
import { useState } from "react";
import InputLabelIcon from "@/app/components/design-system/control/inputs/input-label/InputLabelIcon";
import InputLabelIconCustom from "@/app/components/design-system/control/inputs/input-label-custom/InputLabelIconCustom";
import SwitchLabel from "@/app/components/design-system/control/checkbox/single/switch-label/SwitchLabel";

export default function SettingLobby() {
  const [value, setValue] = useState("");
  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState(false);

  const [label, setLabel] = useState("");
  const [value3, setValue3] = useState(0);

  const handleChange = (text: any) => {
    setValue(text);
  };
  const handleChange1 = (text: number) => {
    setValue1(text);
  };
  const handleChange2 = (text: boolean) => {
    setValue2(text);
  };

  const handleChangeLabel = (text: string) => {
    setLabel(text);
  };
  const handleChange3 = (text: number) => {
    setValue3(text);
  };

  return (
    <Box>
      <InputLabelIcon
        label="Hello"
        handleChangeCurrentValue={handleChange}
        currentValue={value}
        type={InputLabelIcon.types.TEXT}
        isUpperCase
      />

      <InputLabelIcon
        label="Argent"
        handleChangeCurrentValue={handleChange1}
        currentValue={value1}
        type={InputLabelIcon.types.NUMBER}
        isUpperCase
        customAddToText={"$"}
      />

      <SwitchLabel
        label="CheckBox"
        handleChangeCurrentValue={handleChange2}
        currentValue={value2}
        isUpperCase
        customInputProps={{}}
      />

      <InputLabelIconCustom
        labelValue={label}
        currentValue={value3}
        handleChangeLabel={handleChangeLabel}
        handleChangeCurrentValue={handleChange3}
        type={InputLabelIcon.types.NUMBER}
        iconValue={InputLabelIconCustom.icons.PEN}
        iconLabel={InputLabelIconCustom.icons.PEN}
        customAddToText={"(MIN)"}
        isUpperCase
      />
    </Box>
  );
}
