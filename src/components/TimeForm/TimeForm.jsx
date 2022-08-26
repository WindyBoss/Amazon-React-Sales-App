import React, { useContext, useState } from 'react';
import GlobalButton from '../GlobalButton';

import { TimeFormContainer, FormContainer } from './styles/TimeForm.styled';

import { themeContext } from '../../context/authContext';

import 'react-datepicker/dist/react-datepicker.css';

import DayPiker from './components/DayPiker';
import MonthsPiker from './components/MonthsPiker';

const btnStyles = {
  minWidth: '100%',
  marginBottom: '10px',
  marginTop: '10px',
};

export default function TimeForm({
  submitForm,
  onClick,
  position,
  dataType,
  children,
}) {
  const { selectedTheme } = useContext(themeContext);

  const [minDate, setMinDate] = useState(
    new Date().setDate(new Date().getDate() - 30)
  );

  const [maxDate, setMaxDate] = useState(
    new Date().setDate(new Date().getDate())
  );

  const handleChange = data => {
    if (data.type === 'min') {
      setMinDate(data.data.getTime());
      submitForm({ min: data.data.getTime(), max: maxDate });
    }

    if (data.type === 'max') {
      setMaxDate(data.data.getTime());
      submitForm({ min: minDate, max: data.data.getTime() });
    }
  };

  return (
    <TimeFormContainer style={position} theme={selectedTheme}>
      <FormContainer>
        {dataType === 'months' ? (
          <>
            <MonthsPiker
              date={minDate}
              theme={selectedTheme}
              handleChange={handleChange}
              type="min"
            />

            <MonthsPiker
              date={maxDate}
              theme={selectedTheme}
              handleChange={handleChange}
              type="max"
            />
          </>
        ) : (
          <>
            <DayPiker
              date={minDate}
              theme={selectedTheme}
              init={new Date().setDate(new Date().getDate() - 30)}
              onChange={data => handleChange({ data: data, type: 'min' })}
            />
            <DayPiker
              date={maxDate}
              theme={selectedTheme}
              init={new Date()}
              onChange={data => handleChange({ data: data, type: 'max' })}
            />
          </>
        )}
      </FormContainer>
      <GlobalButton styles={btnStyles} type="button" onClick={onClick}>
        Reset Filter
      </GlobalButton>
      {children}
    </TimeFormContainer>
  );
}
