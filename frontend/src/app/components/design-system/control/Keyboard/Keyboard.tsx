import React, { useState, useRef } from "react";
import { Input, Box } from "@chakra-ui/react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import ModalBase from "../modal/ModalBase";

interface KeyboardComponentProps {}

const KeyboardComponent = (props: KeyboardComponentProps) => {
  const [layoutName, setLayoutName] = useState("default");
  const [input, setInput] = useState("");
  const [openKeyboard, setOpenKeyboard] = useState(false);

  //   const keyboardRef = useRef<any>(null); // Ref type for the keyboard

  const handleKeyboard = (value: boolean) => setOpenKeyboard(value);

  const onChange = (newInput: string) => {
    setInput(newInput);
    console.log("Input changed", newInput);
  };

  const onKeyPress = (button: string) => {
    console.log("Button pressed", button);
    if (button === "{shift}" || button === "{lock}") handleShift();
  };

  const handleShift = () => {
    setLayoutName((prevLayoutName) =>
      prevLayoutName === "default" ? "shift" : "default"
    );
  };

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newInput = event.target.value;
    setInput(newInput);
    // keyboardRef.current.setInput(newInput);
  };

  return (
    <ModalBase isOpen={openKeyboard} handleCloseModal={handleKeyboard}>
      <Input
        value={input}
        placeholder={"Tap on the virtual keyboard to start"}
        onChange={onChangeInput}
      />
      <Keyboard
        // keyboardRef={keyboardRef}
        layoutName={layoutName}
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
    </ModalBase>
  );
};

export default KeyboardComponent;
