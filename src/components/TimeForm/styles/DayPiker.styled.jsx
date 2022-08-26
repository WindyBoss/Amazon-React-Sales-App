import styled from '@emotion/styled';

export const Select = styled.select`
  background-color: ${props => `${props.theme.calendarBgColor}`};
  color: ${props => props.theme.mainTextColor};
  margin-right: 'auto';
  margin-left: 'auto';
`;

export const MonthsPickerContainer = styled.div`
  margin: 10px;
  display: flex;
  justify-content: center;
  background-color: ${props => `${props.theme.calendarBgColor}`};
  border: ${props => `1px solid ${props.theme.borderColor}`};
`;
