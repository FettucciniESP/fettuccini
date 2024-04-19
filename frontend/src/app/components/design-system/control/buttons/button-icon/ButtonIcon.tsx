import { Button, Text, ButtonProps } from "@chakra-ui/react";
import { FaRegSave } from "react-icons/fa";
import { IoReload } from "react-icons/io5";
import { IoMdPlay } from "react-icons/io";
import styles from "./ButtonIcon.module.scss";

const icons = {
  SAVE: "SAVE",
  LOAD: "LOAD",
  PLAY: "PLAY",
};

const customStyles = {
  SETTING_LOBBY: "SETTING_LOBBY",
  SETTING_STRUCTURE: "SETTING_STRUCTURE",
};

const defaultProps = {
  customStyle: customStyles.SETTING_LOBBY as keyof typeof customStyles,
};

interface ButtonIconProps {
  // Required
  label: string;
  handleClick: () => void;
  // Optional
  icon?: any;
  isUpperCase?: boolean;
  disabled?: boolean;
  customStyle?: (typeof customStyles)[keyof typeof customStyles];
}

function ButtonIcon(props: ButtonIconProps & ButtonProps) {
  const { handleClick, label, disabled, isUpperCase } = props;

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

  const getCustomStyle = () => {
    const { customStyle } = props;

    if (customStyle) {
      switch (customStyle) {
        case customStyles.SETTING_LOBBY:
          return styles.buttonLobbyStyle;
        case customStyles.SETTING_STRUCTURE:
          return styles.buttonStructureStyle;
      }
    }
    return styles.buttonLobbyStyle;
  };

  const baseButtonConfig = {
    size: "sm",
    variant: "ghost",
    isActive: false,
    borderRadius: "15px",
    _hover: { bg: "none" },
  };

  const buttonIcon = displayIcon();
  const buttonStyle = getCustomStyle();

  return (
    <Button
      onClick={handleClick}
      leftIcon={buttonIcon}
      className={buttonStyle}
      {...baseButtonConfig}
      {...props}
    >
      <Text className={styles.textButtonStyle}>{label}</Text>
    </Button>
  );
}

ButtonIcon.icons = icons;
ButtonIcon.customStyles = customStyles;
ButtonIcon.defaultProps = defaultProps;
export default ButtonIcon;
