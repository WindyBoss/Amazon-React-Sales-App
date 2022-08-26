import ComposedChartComponent from 'components/Charts/ComposedChartElComponent';
import markets from 'data/markets';

import { Slider } from '@mui/material';

import MarketTable from './MarketTable';
import { useContext, useState } from 'react';
import { themeContext } from 'context/authContext';
import mathRound from 'helpers/mathRound';

import { MarketContainer, SliderContainer } from './MarketData.styled';

export default function MarketData({ data }) {
  const [filterValues, setFilterValues] = useState([0, 100]);
  const { selectedTheme } = useContext(themeContext);

  const [tableData, setTableData] = useState(data.tableData);
  const [composedData, setComposedData] = useState(data.composedChart);

  const [dates, setDates] = useState([
    data.composedChart[0].dayId,
    data.composedChart[data.composedChart.length - 1].dayId,
  ]);

  function showChartOptions() {
    return {
      XAxisDataKey: 'dayId',
      barDataKey: 'totalQuantity',
      lineDataKey: 'totalSalesEUR',
    };
  }

  function filterData(data, timeLine) {
    const composedData = [];

    const min = mathRound((timeLine[0] * data.composedChart.length) / 100, 1);
    const max = mathRound((timeLine[1] * data.composedChart.length) / 100, 1);

    for (let i = min; i < max; i++) {
      composedData.push(data.composedChart[i]);
    }

    const tableData = {
      totalQuantity: mathRound(
        composedData.reduce((acc, el) => acc + el.totalQuantity, 0),
        100
      ),
      totalSalesEUR: mathRound(
        composedData.reduce((acc, el) => acc + el.totalSalesEUR, 0),
        100
      ),

      totalSalesLocalCurrency: mathRound(
        composedData.reduce((acc, el) => acc + el.totalSalesLocalCurrency, 0),
        100
      ),

      totalSalesPLN: mathRound(
        composedData.reduce((acc, el) => acc + el.totalSalesPLN, 0),
        100
      ),
    };

    setDates([
      composedData[0].dayId,
      composedData[composedData.length - 1].dayId,
    ]);

    setTableData(tableData);
    setComposedData(composedData);
  }

  function handleChange(e) {
    const value = e.target.value;
    setFilterValues(value);
    filterData(data, value);
  }

  return (
    <MarketContainer
      id={markets.markets.filter(market => market.id === data.id)[0].fullName}
      theme={selectedTheme}
    >
      <h2>
        {markets.markets.filter(market => market.id === data.id)[0].fullName}
      </h2>
      <div style={{ display: 'flex' }}>
        <ComposedChartComponent
          data={composedData}
          chartOptions={showChartOptions()}
          sizes={{ width: 1000, height: 300 }}
        />
        <SliderContainer>
          <h4>
            {dates[0]} - {dates[1]}
          </h4>
          <Slider
            orientation="vertical"
            sx={{ height: '300px' }}
            value={filterValues}
            onChange={handleChange}
          />
        </SliderContainer>
        <MarketTable data={tableData} />
      </div>
    </MarketContainer>
  );
}
