import ComposedChartComponent from 'components/Charts/ComposedChartElComponent/ComposedChartComponent';
import PieChartComponent from './PieChartComponent';

import SectionContainer from 'components/SectionContainer';
import { useContext } from 'react';
import { themeContext } from 'context/authContext';

export default function SalesGraphSection({
  data,
  onSubmit,
  onClick,
  options,
  onChange,
  formDate,
  monthData,
  chartOptions,
}) {
  const { selectedTheme } = useContext(themeContext);
  return (
    <SectionContainer name="salesGraphs">
      <h2>Sales Graph</h2>

      <div
        style={{
          borderBottom: `1px solid ${selectedTheme.borderColor}`,
          minWidth: '100%',
        }}
      >
        <ComposedChartComponent
          data={data}
          onSubmit={onSubmit}
          onClick={onClick}
          position={{
            position: 'absolute',
            top: '0',
            right: '70px',
          }}
          chartOptions={chartOptions}
          sizes={{ width: 1000, height: 250 }}
        />
      </div>
      <PieChartComponent
        monthData={monthData}
        options={options}
        onChange={onChange}
        formDate={formDate}
      />
    </SectionContainer>
  );
}
