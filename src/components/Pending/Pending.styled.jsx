import styled from "@emotion/styled";

export const PendingContainer = styled.div`
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
  background-color: ${(props) => props.theme.globalBgColor};
`;
