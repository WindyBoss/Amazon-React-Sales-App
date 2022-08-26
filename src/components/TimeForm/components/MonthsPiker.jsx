import React from 'react';
import CalendarContainer from './CalendarContainer';
import 'react-datepicker/dist/react-datepicker.css';

import { StyledDatePicker } from '../styles/TimeForm.styled';

const MonthsPiker = ({ date, theme, handleChange, type }) => {
  return (
    <StyledDatePicker
      calendarContainer={CalendarContainer}
      selected={date}
      theme={theme}
      dateFormat="MM/yyyy"
      showMonthYearPicker
      showFullMonthYearPicker
      showTwoColumnMonthYearPicker
      onChange={data => handleChange({ data: data, type: type })}
    />
  );
};

export default MonthsPiker;
