import { Container } from "./MainContainer.styled";

import { themeContext } from "../../context/authContext";
import { useContext } from "react";
export default function MainContainer({ children }) {
  const { selectedTheme } = useContext(themeContext);
  return <Container theme={selectedTheme}>{children}</Container>;
}
