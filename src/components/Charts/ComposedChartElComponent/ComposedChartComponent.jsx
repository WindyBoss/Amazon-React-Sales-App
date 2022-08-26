import ComposedChartEl from './ComposedChartEl';

import { ComposedChartElContainer } from './ComposedChartComponent.styled';
import { useContext } from 'react';
import { themeContext } from 'context/authContext';

export default function ComposedChartComponent({
  data,
  chartOptions,
  sizes,
  children,
  fullData,
}) {
  const { selectedTheme } = useContext(themeContext);
  return (
    <ComposedChartElContainer theme={selectedTheme}>
      <ComposedChartEl
        sizes={{ width: sizes.width, height: sizes.height }}
        data={data}
        chartOptions={chartOptions}
        fullData={fullData}
      >
        {children}
      </ComposedChartEl>
    </ComposedChartElContainer>
  );
}
