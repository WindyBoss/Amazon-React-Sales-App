import { NavLink } from 'react-router-dom';

import GlobalButton from 'components/GlobalButton';
import { useContext } from 'react';
import { themeContext } from 'context/authContext';

export default function LeftPanelSumUp({ filteredSumUpRow }) {
  const { selectedTheme } = useContext(themeContext);
  return (
    <ul
      style={{
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        listStyle: 'none',
        minWidth: '100%',
        padding: '10px',
        marginLeft: '-15px',
        borderRadius: '5px',
        marginTop: '10px',
      }}
    >
      {filteredSumUpRow.map(el => {
        return (
          <li
            style={{
              marginBottom: '10px',
              fontSize: '16px',
            }}
            key={el.name}
          >
            <p style={{ marginBottom: '5px' }}>
              {el.name}: {el.value}
            </p>
            <NavLink
              style={{ textDecoration: 'none' }}
              to={el.name === 'Total Quantity' ? `../totalSales` : `${el.id}`}
            >
              <GlobalButton
                sx={{ minWidth: '150px' }}
                size="small"
                variant="contained"
                theme={selectedTheme}
              >
                See data
              </GlobalButton>
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
}
