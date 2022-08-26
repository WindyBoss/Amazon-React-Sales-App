import { Button } from "@mui/material";
import { useContext } from "react";
import { styled as styles } from "@mui/material/styles";

import { themeContext } from "../../context/authContext";
import { useState } from "react";

const BtnStyled = styles(Button)(({ theme, styles }) => ({
  backgroundColor: theme.btnColor,
  backgroundImage: theme.btnColor,

  color: theme.mainTextColor,
  minWidth: "170px",
  ...styles,
  fontFamily: "Oswald",

  "&:hover": {
    backgroundColor: theme.btnHoverColor,
    backgroundImage: theme.btnHoverColor,
  },
}));

export const btnStyles = ({ btnColor, btnHoverColor }, hover) => {
  return {
    backgroundColor: !hover ? `${btnColor}` : `${btnHoverColor}`,
    transform: !hover ? "scale(1)" : "scale(1.1)",
  };
};

export default function GlobalButton({
  children,
  styles,
  onClick,
  endIcon,
  startIcon,
  disabled,
  type
}) {
  const { selectedTheme } = useContext(themeContext);
  const [hover, setHover] = useState(false);
  return (
    <BtnStyled
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      onClick={onClick}
      endIcon={endIcon}
      disabled={disabled}
      theme={selectedTheme}
      styles={styles}
      startIcon={startIcon}
      type={type}
      sx={{
        ...btnStyles(selectedTheme, hover),
      }}
    >
      {children}
    </BtnStyled>
  );
}
