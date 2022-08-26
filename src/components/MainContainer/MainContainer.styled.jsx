import styled from "@emotion/styled";
export const Container = styled.div`
  font-family: Oswald;
  padding: 10px;

  padding-top: 110px;
  background-color: ${(props) => props.theme.globalBgColor};
  background-image: ${(props) => props.theme.globalBgColor};
  min-width: 100vw;
  min-height: 100vh;
  letter-spacing: 1.3;
`;
