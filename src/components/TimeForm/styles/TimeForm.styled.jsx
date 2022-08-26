import styled from '@emotion/styled';
import DatePicker from 'react-datepicker';

export const TimeFormContainer = styled.div`
  border-radius: 5px;
  border: ${props => `1px solid ${props.theme.borderColor}`};
  padding: 20px;
  max-width: 160px;
`;

export const StyledInput = styled.input`
  min-width: 80%;
  margin-bottom: 10px;
  font-size: 14px;
  background-color: ${props => `${props.theme.btnColor}`};
  color: ${props => `${props.theme.mainTextColor}`};
  border: ${props => `1px solid ${props.theme.borderColor}`};
  border-radius: 5px;
  fill: ${props => `${props.theme.mainTextColor}`};
  padding-left: 30px;

  ::-webkit-calendar-picker-indicator {
    background: transparent;
  }
`;

export const StyledDatePicker = styled(DatePicker)`
  min-width: 80%;
  color: ${props => props.theme.tableBorderColor};
  background-color: transparent;
  border: ${props => `1px solid ${props.theme.tableBorderColor}`};
  padding: 5px 0px 5px 30px;
  margin-bottom: 5px;
  border-radius: 5px;
  z-index: 1000;
`;

export const FormContainer = styled.div`
  margin-bottom: 30px;
  max-width: 300px;
`;
