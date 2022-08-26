import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";

export const Navigation = styled.nav`
  border-bottom: ${(props) => `1px solid ${props.theme.borderColor}`};
  background-color: ${(props) => `${props.theme.navigationBgColor}`};
  padding: 30px 50px;
  min-width: 100%;
  margin-left: -20px;
  position: fixed;
  top: 0;
  font-family: Oswald;
  z-index: 1000;
`;

export const StyledNavLink = styled(NavLink)`
  color: ${(props) => `${props.theme.mainTextColor}`};
  text-decoration: none;
  font-size: 20px;
  &.active {
    color: ${(props) => `${props.theme.activeLinkColor}`};
  }

  :not(:last-child) {
    margin-right: 20px;
  }
`;
