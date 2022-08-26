import styled from '@emotion/styled';

export const MainWrap = styled.div`
  padding: ${props => (props.type === 'months' ? 0 : '16px')};
  background-color: ${props => `${props.theme.calendarBgColor}`};
  color: ${props => `${props.theme.mainTextColor}`};

  z-index: 1000;
  font-family: Oswald;
`;
