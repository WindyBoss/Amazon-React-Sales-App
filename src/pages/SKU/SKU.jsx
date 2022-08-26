import { useState, useEffect, useContext, useCallback, useRef } from 'react';
import { useParams } from 'react-router-dom';
import filterData from './helpers/filterData';

import { getMonthData } from 'helpers/getMonthData';

import { getData } from 'service/apiService';
import { withApiState } from 'service/stateMachine';

import { useFetch } from 'hooks/useFetch';

import months from 'data/month.json';
import markets from 'data/markets.json';
import skuList from 'data/skuList.json';

import ConcludeTableSection from './components/ConcludeTableSection';
import SalesGraphSection from './components/SalesGraphsSection';
import MarketSalesSection from './components/MarketSalesSection';
import Pending from 'components/Pending';
import TimeForm from 'components/TimeForm';
import MainContainer from 'components/MainContainer';
import Navigation from './components/Navigation';
import DataTableSection from './components/DataTableSection';

import { authContext, themeContext } from 'context/authContext';

const options = [
  { value: 'totalQuantity', label: 'Total Ordered Item' },
  { value: 'totalSalesEUR', label: 'Total Sales EUR' },
];

const chartOptions = {
  XAxisDataKey: 'id',
  barDataKey: 'totalQuantity',
  lineDataKey: 'totalSalesEUR',
};

const marketChartOptions = {
  XAxisDataKey: 'marketId',
  barDataKey: 'totalQuantity',
  lineDataKey: 'totalSalesEUR',
};

const label = { inputProps: { 'aria-label': 'Synchronized Charts' } };

function SKU({ apiState }) {
  const [savedData, setSavedData] = useState(null);
  const [formDate, setFormDate] = useState('totalQuantity');
  const [monthData, setMonthData] = useState(null);
  const [composedChardData, setComposedChardData] = useState(null);
  const [asyncChart, setAsyncChart] = useState(false);
  const [marketData, setMarketData] = useState(null);
  const [asin, setAsin] = useState('');
  // const [tableData, setTableData] = useState([]);

  const [anchors, setAnchors] = useState([
    'dataTable',
    'marketSalesSelection',
    'salesGraphs',
  ]);

  const { setSelectedSKU } = useContext(authContext);
  const { selectedTheme } = useContext(themeContext);

  const params = useParams();
  const skuData = useFetch({
    apiState: apiState,
    fetchAPI: getData,
    param: `skuData?id=${params.skuId}`,
  });

  useEffect(() => {
    setSavedData(skuData);

    skuData.length > 0 &&
      setAsin(skuList.sku.find(product => product.sku === skuData[0].id).asin);

    skuData.length > 0 && setSelectedSKU(skuData[0].id);
  }, [setSelectedSKU, skuData]);

  useEffect(() => {
    if (!skuData || skuData.length === 0) {
      return;
    }
    // console.log(skuData);
    setMonthData(getMonthData(markets.markets, skuData[0].dayData, formDate));
    setComposedChardData(skuData[0].dayData);
    collectMarketData(skuData[0]);
  }, [formDate, skuData]);

  // function filterByDate(timePeriod) {
  //   const newData = filterData({
  //     max: timePeriod.max,
  //     min: timePeriod.min,
  //     data: skuData,
  //     months: months.months,
  //   });

  //   setComposedChardData(newData);
  //   setMonthData(getMonthData(markets.markets, newData, formDate));
  // }

  function collectMarketData(data) {
    const newMarketList = [];

    data.markets.forEach(market => {
      const marketData = {
        id: market.marketId,
        name: markets.markets.find(m => m.id === market.marketId).fullName,
        totalQuantity: market.totalQuantity,
        timeLine: [],
      };

      data.dayData.forEach(day => {
        const filteredMarket = {
          market: day.markets.filter(
            mark => mark.marketId === market.marketId
          )[0],
        };

        filteredMarket.market.date = day.id;
        marketData.timeLine.push(filteredMarket.market);
      });

      newMarketList.push(marketData);
    });

    setMarketData(newMarketList);
  }

  function resetFilter() {
    setComposedChardData(skuData[0].dayData);
    setMonthData(getMonthData(markets.markets, skuData[0].dayData, formDate));
  }

  function findMarketName(marketName) {
    const market = markets.markets.find(market => market.id === marketName);
    return market.fullName;
  }

  function handleChange(e) {
    const { checked } = e.target;
    setAsyncChart(!checked);
  }

  const sku = savedData ? savedData[0] : null;
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: selectedTheme.globalBgColor,
      }}
    >
      {apiState.isPending() && <Pending />}
      {apiState.isSuccess() && savedData.length > 0 && (
        <MainContainer>
          <Navigation anchors={anchors} />
          <ConcludeTableSection
            sku={sku}
            asin={asin}
            findMarketName={findMarketName}
          />
          <div>
            <SalesGraphSection
              data={composedChardData}
              // onSubmit={filterByDate}
              onClick={resetFilter}
              options={options}
              onChange={setFormDate}
              formDate={formDate}
              monthData={monthData}
              chartOptions={chartOptions}
              setAnchors={setAnchors}
            />

            <MarketSalesSection
              label={label}
              onChange={handleChange}
              data={marketData}
              asyncChart={asyncChart}
              asin={asin}
              setAnchors={setAnchors}
            />
          </div>
          {skuData.length > 0 && (
            <DataTableSection data={skuData} markets={markets.markets} />
          )}
        </MainContainer>
      )}
    </div>
  );
}

export default withApiState(SKU);
