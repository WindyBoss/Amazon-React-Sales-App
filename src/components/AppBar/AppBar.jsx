import React, { useContext } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Navigation, StyledNavLink } from "./styles/AppBar.styled";

import { authContext } from "../../context/authContext";
import { themeContext } from "../../context/authContext";

import { IconButton } from "@mui/material";
import NightlightIcon from "@mui/icons-material/Nightlight";
import WbSunnyIcon from "@mui/icons-material/WbSunny";

export default function AppBar() {
  const location = useLocation();
  const navigate = useNavigate();

  const { selectedSKU } = useContext(authContext);

  const { selectedTheme, changeTheme } = useContext(themeContext);

  console.log(changeTheme);

  //   const handleClick = () => {
  //     navigate(
  //       location?.state
  //         ? `${location?.state?.pathname}${location?.state?.search}`
  //         : -1
  //     );
  //   };

  return (
    <>
      <header>
        <Navigation theme={selectedTheme}>
          {/* <button
            sx={goBackBtnStyle}
            size="large"
            onClick={() => handleClick()}
          >
            Go back
          </button> */}
          <StyledNavLink theme={selectedTheme} to="/">
            Home
          </StyledNavLink>
          <StyledNavLink theme={selectedTheme} to="/publish">
            Add Data
          </StyledNavLink>
          <StyledNavLink theme={selectedTheme} to="totalSales">
            Total Sales
          </StyledNavLink>
          <StyledNavLink theme={selectedTheme} to="salesPerSKU">
            Sales Per SKU
          </StyledNavLink>

          {selectedSKU.length > 0 && (
            <StyledNavLink
              style={{ marginLeft: "55%" }}
              to={`salesPerSKU/${selectedSKU}`}
              theme={selectedTheme}
            >
              {selectedSKU}
            </StyledNavLink>
          )}

          <IconButton
            onClick={changeTheme}
            sx={{ color: selectedTheme.mainTextColor, marginLeft: "auto" }}
            size="large"
          >
            {selectedTheme.id === "dark" ? (
              <WbSunnyIcon fontSize="large" />
            ) : (
              <NightlightIcon fontSize="large" />
            )}
          </IconButton>
        </Navigation>
      </header>
      <Outlet />
    </>
  );
}

const goBackBtnStyle = {
  color: "black",
  fontFamily: "inherit",
  fontSize: "16px",
  fontWeight: "bold",
  marginRight: "40px",
};
