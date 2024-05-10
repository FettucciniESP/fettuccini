import { Button, Text, ButtonProps } from "@chakra-ui/react";
import { FaRegSave } from "react-icons/fa";
import { IoReload } from "react-icons/io5";
import { IoMdPlay } from "react-icons/io";
import styles from "./ButtonText.module.scss";

const customStyles = {
  TRANSPARENT: "TRANSPARENT",
};

const defaultProps = {
  customStyle: customStyles.TRANSPARENT as keyof typeof customStyles,
};

interface ButtonTextProps {
  // Required
  label: string;
  handleClick: () => void;
  // Optional
  icon?: any;
  isUpperCase?: boolean;
  disabled?: boolean;
  customStyle?: (typeof customStyles)[keyof typeof customStyles];
}

function ButtonText(props: ButtonTextProps & ButtonProps) {
  const { handleClick, label } = props;

  const getCustomStyle = () => {
    const { customStyle } = props;

    if (customStyle) {
      switch (customStyle) {
        case customStyles.TRANSPARENT:
          return styles.buttonTransparentStyle;
      }
    }
    return styles.buttonTransparentStyle;
  };

  const baseButtonConfig = {
    size: "sm",
    variant: "ghost",
    isActive: false,
    borderRadius: "15px",
    _hover: { bg: "none" },
  };

  const buttonStyle = getCustomStyle();

  return (
    <Button
      onClick={handleClick}
      className={buttonStyle}
      {...baseButtonConfig}
      {...props}
    >
      <Text className={styles.textButtonStyle}>{label}</Text>
    </Button>
  );
}

ButtonText.customStyles = customStyles;
ButtonText.defaultProps = defaultProps;
export default ButtonText;
