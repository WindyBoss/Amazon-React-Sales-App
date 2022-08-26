import { Link, animateScroll as scroll } from "react-scroll";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

import { IconButton } from "@mui/material";

import { LocalNavigationContainer } from "../../styles/SKU.styled";
import { themeContext } from "context/authContext";
import { useContext } from "react";

import GlobalButton from "components/GlobalButton";

export default function Navigation({ anchors, ss }) {
  const { selectedTheme } = useContext(themeContext);
  return (
    <LocalNavigationContainer theme={selectedTheme}>
      <h3>Navigation</h3>
      <Link smooth={true} duration={500} spy={true} to="dataTable">
        <GlobalButton styles={{ marginBottom: "10px" }}>
          To Main Table
        </GlobalButton>
      </Link>

      <Link smooth={true} duration={500} spy={true} to="marketSalesSelection">
        <GlobalButton styles={{ marginBottom: "10px" }}>
          To Market Sales
        </GlobalButton>
      </Link>
      <Link smooth={true} duration={500} spy={true} to={anchors[2]}>
        <GlobalButton styles={{ marginBottom: "10px" }}>
          To Sales Graphs
        </GlobalButton>
      </Link>
      <IconButton
        onClick={scrollToUp}
        sx={{
          marginTop: "10px",
          borderRadius: "50%",
          maxWidth: "40px",
          marginRight: "auto",
          marginLeft: "auto",
          marginBottom: "20px",
          color: selectedTheme.mainTextColor,
        }}
      >
        <ArrowUpwardIcon />
      </IconButton>
    </LocalNavigationContainer>
  );
}

function scrollToUp() {
  scroll.scrollToTop();
}
