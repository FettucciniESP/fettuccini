import React, { useState, useRef } from "react";
import { Input, Box } from "@chakra-ui/react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import ModalBase from "../modal/ModalBase";
import "./Keyboard.css";

const MAX_LENGTH_NUMBER: number = 6;
const MAX_LENGTH_TEXT: number = 60;

const KeyboardTypes = {
  BASE: "inputBase",
  CUSTOM: "inputCustom",
  NUMBER: "inputNumber",
};

const defaultProps = {
  type: KeyboardTypes.BASE as keyof typeof KeyboardTypes,
};

interface KeyboardComponentProps {
  openKeyboard: boolean;
  currentValue?: string | number | null;
  type?: string;
  handleKeyboard: () => boolean;
  confirmValue: (value: string | number | null) => void;
}

const containerStyle = {
  height: "100%",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
};
const inputContainerStyle = {
  backgroundColor: "#fff",
  marginBottom: "10px",
};
const KeyboardComponent = (props: KeyboardComponentProps) => {
  const { openKeyboard, currentValue, type, handleKeyboard, confirmValue } =
    props;

  const [input, setInput] = useState(!!currentValue ? currentValue : "");

  const onChange = (newInput: string) => {
    if (type == KeyboardTypes.NUMBER) {
      if (newInput.length <= MAX_LENGTH_NUMBER) {
        setInput(newInput);
      }
    } else if (type == KeyboardTypes.BASE || type == KeyboardTypes.CUSTOM) {
      if (newInput.length <= MAX_LENGTH_TEXT) {
        setInput(newInput);
      }
    }
  };

  const onKeyPress = (button: string) => {
    if (button === "{enter}") confirmValue(input);
  };

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newInput = event.target.value;
    if (type == KeyboardTypes.NUMBER) {
      if (newInput.length <= MAX_LENGTH_NUMBER) {
        setInput(newInput);
      }
    } else if (type == KeyboardTypes.BASE || type == KeyboardTypes.CUSTOM) {
      if (newInput.length <= MAX_LENGTH_TEXT) {
        setInput(newInput);
      }
    }
  };

  const layout = {
    inputBase: [
      "a z e r t y u i o p {bksp}",
      "q s d f g h j k l {enter}",
      "w x c v b n m",
    ],
    inputCustom: [
      "1 2 3 4 5 6 7 8 9 0",
      "a z e r t y u i o p {bksp}",
      "q s d f g h j k l {enter}",
      "w x c v b n m",
      "{space}",
    ],
    inputNumber: ["1 2 3", "4 5 6", "7 8 9", "{bksp} 0 {enter}"],
  };

  const display = {
    "{enter}": "Valider",
    "{bksp}": "⌫",
    "{space}": "Espace",
  };

  const buttonTheme = [
    {
      class: "hg-blue, hg-blue-bg",
      buttons: "{enter}",
    },
  ];

  return (
    <ModalBase isOpen={openKeyboard} handleCloseModal={handleKeyboard}>
      <Box style={{ ...containerStyle }}>
        <Input
          style={{ ...inputContainerStyle }}
          value={input}
          placeholder={""}
          onChange={onChangeInput}
          maxLength={
            type == KeyboardTypes.NUMBER ? MAX_LENGTH_NUMBER : MAX_LENGTH_TEXT
          }
        />
        <Keyboard
          layoutName={type}
          layout={layout}
          theme="hg-theme-default hg-layout-numeric numeric-theme"
          display={display}
          buttonTheme={buttonTheme}
          inputValue={input}
          onChange={onChange}
          onKeyPress={onKeyPress}
        />
      </Box>
    </ModalBase>
  );
};

KeyboardComponent.types = KeyboardTypes;
KeyboardComponent.defaultProps = defaultProps;
export default KeyboardComponent;
