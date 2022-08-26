import { Link, animateScroll as scroll } from 'react-scroll';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

import { IconButton } from '@mui/material';

import {
  LocalNavigationContainer,
  MarketContainer,
  MarketTitle,
} from './Navigation.styled';
import { themeContext } from 'context/authContext';
import { useContext } from 'react';

import GlobalButton from 'components/GlobalButton';

import markets from 'data/markets';

export default function Navigation({ anchors }) {
  const { selectedTheme } = useContext(themeContext);
  return (
    <LocalNavigationContainer theme={selectedTheme}>
      <h3>Navigation</h3>
      <Link
        smooth={true}
        duration={500}
        spy={true}
        to="date-comparison"
        hashSpy={true}
        offset={-300}
      >
        <GlobalButton styles={{ marginBottom: '10px' }}>
          Sales Conclusions
        </GlobalButton>
      </Link>

      <Link
        smooth={true}
        duration={500}
        spy={true}
        to="market-comparison"
        hashSpy={true}
        offset={-120}
      >
        <GlobalButton styles={{ marginBottom: '10px' }}>
          Market Analysis
        </GlobalButton>
      </Link>
      <MarketContainer theme={selectedTheme}>
        <MarketTitle>Markets</MarketTitle>
        {markets.markets.map(market => {
          return (
            <Link
              smooth={true}
              duration={500}
              spy={true}
              to={market.id}
              hashSpy={true}
              offset={-450}
              key={market.id}
            >
              <GlobalButton styles={{ marginBottom: '10px' }}>
                {market.fullName}
              </GlobalButton>
            </Link>
          );
        })}
      </MarketContainer>
      <Link
        smooth={true}
        duration={500}
        spy={true}
        to="week-data"
        hashSpy={true}
        offset={-120}
      >
        <GlobalButton styles={{ marginBottom: '10px', marginTop: '20px' }}>
          Week Analysis
        </GlobalButton>
      </Link>
      <Link
        smooth={true}
        duration={500}
        spy={true}
        to="category-analysis"
        hashSpy={true}
        offset={-120}
      >
        <GlobalButton styles={{ marginBottom: '10px' }}>
          Category Analysis
        </GlobalButton>
      </Link>

      <IconButton
        onClick={scrollToUp}
        sx={{
          marginTop: '10px',
          borderRadius: '50%',
          maxWidth: '40px',
          marginRight: 'auto',
          marginLeft: 'auto',
          marginBottom: '20px',
          color: selectedTheme.mainTextColor,
        }}
      >
        <ArrowUpwardIcon />
      </IconButton>
    </LocalNavigationContainer>
  );
}

function scrollToUp() {
  scroll.scrollToTop();
}
