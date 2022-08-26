import styled from '@emotion/styled';

export const LocalNavigationContainer = styled.div`
  position: fixed;
  right: 0px;
  top: 130px;
  border: ${props => `1px solid ${props.theme.borderColor}`};
  z-index: 10000;
  background-color: ${props => props.theme.navigationBgColor};
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  min-width: 13%;
  color: ${props => props.theme.mainTextColor};
`;

export const MarketContainer = styled.div`
  border: ${props => `1px solid ${props.theme.borderColor}`};
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
  border-radius: 5px;
  margin-top: 10px;
`;

export const MarketTitle = styled.h3`
  margin: 10px auto;
`;
