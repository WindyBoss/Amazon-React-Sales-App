import { useContext } from 'react';
import { Container } from './styles/Total.styled';

import MainContainer from 'components/MainContainer';

import { themeContext } from 'context/authContext';

import ComposedChartSection from './components/ComposedChartSection/ComposedChartSection';
import PieChartSection from './components/PieChartSection';
import Navigation from './components/Navigation';
import WeekDaysStats from './components/WeekDaysStats';
import CategorySection from './components/CategorySection';

function Total() {
  const { selectedTheme } = useContext(themeContext);

  return (
    <MainContainer>
      <Container>
        <div
          style={{
            padding: '30px',
            border: `1px solid ${selectedTheme.borderColor}`,
            margin: '20px',
            borderRadius: '5px',
          }}
        >
          <h1
            style={{
              color: selectedTheme.mainTextColor,
              marginBottom: '30px',
            }}
          >
            Sales Conclusion
          </h1>
          <ComposedChartSection />
          <PieChartSection />
          <WeekDaysStats />
          <CategorySection />

        </div>
      </Container>
      <Navigation />
    </MainContainer>
  );
}

export default Total;
