import React from 'react';

import IconButton from '@mui/material/IconButton';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import getYear from 'date-fns/getYear';
import getMonth from 'date-fns/getMonth';

import CalendarContainer from './CalendarContainer';

import { StyledDatePicker } from '../styles/TimeForm.styled';

import addDays from 'date-fns/addDays';
import subDays from 'date-fns/subDays';

import { Select, MonthsPickerContainer } from '../styles/DayPiker.styled';
import 'react-datepicker/dist/react-datepicker.css';

const DayPiker = ({ date, theme, onChange }) => {
  const years = [];
  for (let i = 2015; i <= new Date().getFullYear(); i++) {
    years.push(i);
  }
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return (
    <StyledDatePicker
      calendarContainer={CalendarContainer}
      selected={date}
      onChange={onChange}
      theme={theme}
      excludeDateIntervals={[
        { start: subDays(new Date() - 1, 0), end: addDays(new Date(), 365) },
      ]}
      renderCustomHeader={({
        date,
        changeYear,
        changeMonth,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <MonthsPickerContainer theme={theme}>
          <IconButton
            onClick={decreaseMonth}
            disabled={prevMonthButtonDisabled}
          >
            <KeyboardArrowLeftIcon />
          </IconButton>

          <Select
            value={getYear(date)}
            theme={theme}
            onChange={({ target: { value } }) => {
              console.log(theme);
              changeYear(value);
            }}
          >
            {years.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
          <Select
            value={months[getMonth(date)]}
            onChange={({ target: { value } }) =>
              changeMonth(months.indexOf(value))
            }
            theme={theme}
          >
            {months.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
          <IconButton
            onClick={increaseMonth}
            disabled={nextMonthButtonDisabled}
          >
            <KeyboardArrowRightIcon />
          </IconButton>
        </MonthsPickerContainer>
      )}
    />
  );
};

export default DayPiker;
