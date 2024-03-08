import { Box, Button, Text, ButtonProps } from "@chakra-ui/react";
import { FaRegSave } from "react-icons/fa";
import { IoReload } from "react-icons/io5";
import { IoMdPlay } from "react-icons/io";
import styles from "./ButtonIcon.module.scss";

const icons = {
  SAVE: "SAVE",
  LOAD: "LOAD",
  PLAY: "PLAY",
};

interface ButtonIconProps {
  // Required
  label: string;
  hangdleOnClick: () => void;
  // Optional
  icon?: any;
  isUpperCase?: boolean;
  disabled?: boolean;
}

function ButtonIcon(props: ButtonIconProps & ButtonProps) {
  const { hangdleOnClick, label, disabled, isUpperCase } = props;

  const displayIcon = () => {
    const { icon } = props;
    let currentIcon;

    const config = {
      className: styles.iconStyle,
      size: 15,
      color: "#fff",
    };

    if (icon) {
      switch (icon) {
        case icons.SAVE:
          currentIcon = <FaRegSave {...config} />;
          break;
        case icons.LOAD:
          currentIcon = <IoReload {...config} />;
          break;
        case icons.PLAY:
          currentIcon = <IoMdPlay {...config} />;
          break;
        default:
          break;
      }
    }

    return currentIcon;
  };

  const buttonIcon = displayIcon();
  const baseButtonConfig = {
    size: "sm",
    variant: "ghost",
    isActive: false,
    borderRadius: "30px",
    _hover: { bg: "none" },
  };

  return (
    <Button
      onClick={hangdleOnClick}
      leftIcon={buttonIcon}
      className={styles.buttonStyle}
      {...baseButtonConfig}
      {...props}
    >
      <Text className={styles.textButtonStyle}>{label}</Text>
    </Button>
  );
}

ButtonIcon.icons = icons;

export default ButtonIcon;
