import { themeContext } from 'context/authContext';
import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { MainWrap } from '../styles/CalendarContainer.styled';

const CalendarContainer = ({ className, children }) => {
  const [timeForm, setTimeForm] = useState('days');
  const { selectedTheme } = useContext(themeContext);

  const location = useLocation();

  useEffect(() => {
    const { search } = location;

    if (!search || !search.indexOf('time=')) {
      return;
    }

    setTimeForm(search.slice(search.indexOf('time=') + 5));
  }, [location]);

  return (
    <div>
      <MainWrap className={className} type={timeForm} theme={selectedTheme}>
        <div>{children}</div>
      </MainWrap>
    </div>
  );
};

export default CalendarContainer;
