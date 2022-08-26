import React from "react";
import { ThreeCircles } from "react-loader-spinner";

import { PendingContainer } from "./Pending.styled";

import { themeContext } from "../../context/authContext";
import { useContext } from "react";

export default function Pending() {
  const { selectedTheme } = useContext(themeContext);
  return (
    <PendingContainer theme={selectedTheme}>
      <ThreeCircles
        ariaLabel="loading-indicator"
        outerCircleColor={selectedTheme.btnColor}
        middleCircleColor={selectedTheme.btnTextColor}
        innerCircleColor={selectedTheme.borderColor}
        height={200}
        width={200}
      />
    </PendingContainer>
  );
}
