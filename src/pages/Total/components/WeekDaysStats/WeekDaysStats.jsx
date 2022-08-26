import weekDays from 'data/weekDays';
import markets from 'data/markets';
import React, { useContext, useEffect, useState } from 'react';

import mathRound from 'helpers/mathRound';

import { useFetch } from 'hooks/useFetch';
import { withApiState } from 'service/stateMachine';
import { getData } from 'service/apiService';

import FormWeekDataType from './components/FormWeekDataType';
import StatsTable from './components/StatsTable';
import SectionContainer from 'components/SectionContainer';
import TimeForm from 'components/TimeForm';
import ComposedChartComponent from 'components/Charts/ComposedChartElComponent';

function showChartOptions(option) {
  return {
    XAxisDataKey: 'dayName',
    barDataKey: option,
  };
}

const formOptions = [
  { value: 'totalOrderNumber', label: 'Total Order Number' },
  { value: 'totalQuantity', label: 'Total Sold Items' },
  { value: 'totalSalesEUR', label: 'EUR Turnover' },
  { value: 'totalSalesPLN', label: 'PLN Turnover' },
  { value: 'AverageTotalSalesEUR', label: 'Average Daily EUR Sales' },
  { value: 'averageOrderNumber', label: 'Average Daily Order Number' },
  { value: 'averageTotalQuantity', label: 'Average Daily Sold Items' },
  { value: 'averageTotalSalesPLN', label: 'Average Daily PLN Sales' },
];

function WeekDaysStats({ apiState }) {
  const [mainData, setMainData] = useState(null);
  const [filteredWeekData, setFilteredWeekData] = useState(null);
  const [dataOption, setDataOption] = useState('totalQuantity');

  const data = useFetch({
    apiState: apiState,
    fetchAPI: getData,
    param: 'days',
  });

  useEffect(() => {
    if (!data || data.length === 0) {
      return;
    }

    setMainData(data);
  }, [data]);

  useEffect(() => {
    if (!mainData) {
      return;
    }

    const weekData = weekDays.map(element => {
      const dayList = mainData.filter(
        day => day.dayInWeek === element.position
      );
      const dayNumber = dayList.length;

      const dayData = {
        dayCount: dayNumber,

        dayName: element.name,
        position: element.position,
        id: element.id,
        totalOrderNumber: dayList.reduce(
          (acc, day) => acc + day.orderNumber,
          0
        ),
        averageOrderNumber: mathRound(
          dayList.reduce((acc, day) => acc + day.orderNumber, 0) / dayNumber,
          100
        ),

        totalQuantity: dayList.reduce((acc, day) => acc + day.totalQuantity, 0),
        averageTotalQuantity: mathRound(
          dayList.reduce((acc, day) => acc + day.totalQuantity, 0) / dayNumber,
          100
        ),

        totalSalesEUR: mathRound(
          dayList.reduce((acc, day) => acc + day.totalSalesEUR, 0),
          100
        ),
        AverageTotalSalesEUR: mathRound(
          dayList.reduce((acc, day) => acc + day.totalSalesEUR, 0) / dayNumber,
          100
        ),

        totalSalesPLN: dayList.reduce((acc, day) => acc + day.totalSalesPLN, 0),

        averageTotalSalesPLN: mathRound(
          dayList.reduce((acc, day) => acc + day.totalSalesPLN, 0) / dayNumber,
          100
        ),

        dayList: dayList,

        markets: markets.markets
          .map(market => {
            return {
              marketName: market.fullName,
              marketId: market.id,
              totalQuantity: dayList.reduce(
                (acc, day) =>
                  acc +
                  day.markets.filter(
                    mainDataMarket => mainDataMarket.id === market.id
                  )[0].totalQuantity,
                0
              ),

              totalSalesEUR: mathRound(
                dayList.reduce(
                  (acc, day) =>
                    acc +
                    day.markets.filter(
                      mainDataMarket => mainDataMarket.id === market.id
                    )[0].totalSalesEUR,
                  0
                ),
                100
              ),
              totalSalesLocalCurrency: mathRound(
                dayList.reduce(
                  (acc, day) =>
                    acc +
                    day.markets.filter(
                      mainDataMarket => mainDataMarket.id === market.id
                    )[0].totalSalesLocalCurrency,
                  0
                ),
                100
              ),
              totalSalesPLN: mathRound(
                dayList.reduce(
                  (acc, day) =>
                    acc +
                    day.markets.filter(
                      mainDataMarket => mainDataMarket.id === market.id
                    )[0].totalSalesPLN,
                  0
                ),
                100
              ),
            };
          })
          .sort((a, b) => b.totalQuantity - a.totalQuantity),
      };

      return dayData;
    });

    setFilteredWeekData(weekData.sort((a, b) => a.position - b.position));
  }, [mainData]);

  function filterData(filter) {
    const newData = data.filter(
      day =>
        Date.parse(day.date) <= filter.max && Date.parse(day.date) >= filter.min
    );
    setMainData(newData);
  }

  function resetFilter() {
    setMainData(data);
  }

  return (
    <SectionContainer id="week-data">
      <h2>Week Analysis</h2>

      {filteredWeekData && (
        <>
          <div style={{ display: 'flex', justifyContent: 'start' }}>
            <ComposedChartComponent
              data={filteredWeekData}
              chartOptions={showChartOptions(dataOption)}
              sizes={{ width: 1200, height: 400 }}
              fullData={true}
            >
              <FormWeekDataType
                onChange={setDataOption}
                label="Select Data Type"
                options={formOptions}
              />
            </ComposedChartComponent>
            <TimeForm
              submitForm={filterData}
              onClick={resetFilter}
              position={{
                position: 'sticky',
                right: 100,
                top: 150,
                maxHeight: 250,
                marginRight: 100,
              }}
            />
          </div>
          <StatsTable data={filteredWeekData} />
        </>
      )}
    </SectionContainer>
  );
}

export default withApiState(WeekDaysStats);
