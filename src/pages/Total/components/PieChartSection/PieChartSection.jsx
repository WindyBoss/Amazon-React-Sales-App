import { useState, useEffect } from 'react';

import { useFetch } from 'hooks/useFetch';

import { withApiState } from 'service/stateMachine';
import { getData } from 'service/apiService';

import PieChartComponent from './components/PieChartComponent';

import { getMonthData } from 'helpers/getMonthData';

import markets from 'data/markets';

import Pending from 'components/Pending';
import SectionContainer from 'components/SectionContainer';

import marketFullData from 'pages/Total/helpers/marketFullData';

import MarketData from './components/MarketData';

const options = [
  { value: 'totalQuantity', label: 'Total Ordered Item' },
  { value: 'totalSalesPLN', label: 'Total Sales PLN' },
  { value: 'totalSalesEUR', label: 'Total Sales EUR' },
];

function PieChartSection({ apiState }) {
  const [mainData, setMainData] = useState([]);
  const [formDate, setFormDate] = useState('totalQuantity');

  const data = useFetch({
    apiState: apiState,
    fetchAPI: getData,
    param: 'days',
  });

  const [chartData, setChartData] = useState(mainData);
  const [composedChartsData, setComposedChartsData] = useState([]);

  function filterData(filter) {
    const newData = data.filter(
      day =>
        Date.parse(day.date) <= filter.max && Date.parse(day.date) >= filter.min
    );
    setChartData(getMonthData(markets.markets, newData, formDate, options));
  }

  function resetFilter() {
    setMainData(mainData);
  }

  useEffect(() => {
    if (!data.length > 0) {
      return;
    }

    setComposedChartsData(
      markets.markets.map(market => {
        return marketFullData(data, market.id);
      })
    );

    setMainData(getMonthData(markets.markets, data, formDate, options));
    setChartData(getMonthData(markets.markets, data, formDate, options));
  }, [data, formDate]);

  return (
    <SectionContainer id="market-comparison">
      {apiState.isPending() && <Pending />}
      {apiState.isSuccess() && mainData.length > 0 && (
        <>
          <PieChartComponent
            monthData={chartData}
            options={options}
            onChange={setFormDate}
            formDate={formDate}
            submitForm={filterData}
            onClick={resetFilter}
          />
          {composedChartsData
            .sort(
              (a, b) => b.tableData.totalQuantity - a.tableData.totalQuantity
            )
            .map(market => {
              return <MarketData key={market.id} data={market} />;
            })}
        </>
      )}
    </SectionContainer>
  );
}

export default withApiState(PieChartSection);
