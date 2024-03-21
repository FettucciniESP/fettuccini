const baseModalContainerStyle = {
  height: "85vh",
  width: "90%",
  alignSelf: "center",
  position: "relative",
  backgroundColor: "rgba(255, 255, 255, 0.5)",
  borderRadius: "30px",
};

const backgroundBlur = {
  backdropFilter: "blur(9px)",
};

const exitStyle = {
  zIndex: 1000,
  position: "absolute",
  top: 20,
  right: 20,
  transform: "rotate(45deg)",
};

const modalTitleContainerStyle = {
  maxWidth: "85%",
  overflow: "hidden",
  padding: "10px 30px",
};
const modalTitleStyle = {
  fontSize: 30,
  fontWeight: "bold",
  color: "#fff",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

const iconExitStyle = {
  size: 40,
  color: "#fff",
};

export {
  baseModalContainerStyle,
  backgroundBlur,
  exitStyle,
  modalTitleContainerStyle,
  modalTitleStyle,
  iconExitStyle,
};
