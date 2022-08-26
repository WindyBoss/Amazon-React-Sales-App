import React, { useContext, useEffect, useState } from 'react';
import {
  XAxis,
  YAxis,
  Tooltip,
  Line,
  LineChart,
  ResponsiveContainer,
} from 'recharts';
import Slider from '@mui/material/Slider';

import ChartTable from './ChartTable';

import TimeForm from 'components/TimeForm';

import {
  ChartContainer,
  MarketContainer,
  MainContainer,
  TimeTitle,
  ControllersContainer,
  DataContainer,
  MarketTitle,
  sliderStyles,
} from './SynchronizedLineChart.styled';

import months from 'data/month.json';

import { remadeDate } from 'helpers/remadeDate';
import mathRound from 'helpers/mathRound';
import { themeContext } from 'context/authContext';

export default function SynchronizedLineChart({ data, asin }) {
  const [filteredIndexes, setFilteredIndexes] = useState(data);
  const [value, setValue] = useState([0, 100]);
  const [chartData, setChartData] = useState(data);
  const [dates, setDates] = useState(['1/Jun/2021', '29/Jun/2022']);
  const { selectedTheme } = useContext(themeContext);

  function handleChange(e, newValue) {
    findChartData(newValue);
    setValue(newValue);
    setFilteredIndexes(newValue);
  }

  console.log(data);

  useEffect(() => {
    data && data.length > 0 && setFilteredIndexes([0, data[0].timeLine.length]);
  }, [data]);

  function findChartData(filter) {
    const newData = data.map(el => {
      const dataEl = {
        id: el.id,
        name: el.name,
        totalQuantity: el.totalQuantity,
        timeLine: [],
      };

      for (
        let i = mathRound(
          filter[0] === 100
            ? data[0].timeLine.length * 0.01 * 99
            : 0 + data[0].timeLine.length * 0.01 * filter[0],
          1
        );
        i < mathRound(data[0].timeLine.length * 0.01 * filter[1], 1);
        i++
      ) {
        dataEl.timeLine.push(
          el.timeLine[i]
            ? {
                totalQuantity: el.timeLine[i].totalQuantity,
                marketName: el.timeLine[i].marketName,
                date: el.timeLine[i].date,
                marketId: el.timeLine[i].marketId,
              }
            : {
                value: 0,
                marketName: el.timeLine[i].marketName,
                date: el.timeLine[i].date,
                marketId: el.timeLine[i].marketId,
              }
        );
      }

      return dataEl;
    });

    const lastEl = newData[0].timeLine.length - 1;
    const minDate = newData[0].timeLine[0].date;
    const maxDate = newData[0].timeLine[lastEl].date;

    setDates([minDate, maxDate]);
    setChartData(newData);
  }

  function findTotal(timeData, total) {
    if (!timeData || timeData.length === 0) {
      return 0;
    }

    const totalValue = [];

    timeData.forEach(day => {
      totalValue.push(day.totalQuantity);
    });

    return filteredIndexes[0] === 0 && filteredIndexes[1] === 100
      ? total
      : totalValue.reduce((acc, el) => acc + el, 0);
  }

  function filterByDate(timePeriod) {
    const newData = data.map(el => {
      const dataEl = {
        id: el.id,
        name: el.name,
        totalQuantity: el.totalQuantity,
        timeLine: el.timeLine.filter(day => {
          const timeDate = remadeDate(day, months.months);
          return timeDate <= timePeriod.max && timeDate >= timePeriod.min;
        }),
      };

      let minDate = '';
      let maxDate = '';

      const minSlice = mathRound(
        (el.timeLine.indexOf(
          el.timeLine.find(day => {
            const timeDate = remadeDate(day, months.months);

            if (timeDate >= timePeriod.min) {
              minDate = day.date;
            }

            return timeDate >= timePeriod.min;
          })
        ) *
          100) /
          data[0].timeLine.length,
        1
      );

      const maxSlice = mathRound(
        (el.timeLine.indexOf(
          el.timeLine.find(day => {
            const timeDate = remadeDate(day, months.months);

            if (timeDate >= timePeriod.max) {
              maxDate = day.date;
            }

            return timeDate >= timePeriod.max;
          })
        ) *
          100) /
          data[0].timeLine.length,
        1
      );

      setDates([minDate, maxDate]);

      setValue([minSlice, maxSlice]);

      return dataEl;
    });

    setChartData(newData);
  }

  function resetData() {
    setChartData(data);
  }

  return (
    <MainContainer>
      <ControllersContainer>
        <TimeTitle>
          {dates[1]} {dates[0]}
        </TimeTitle>
        <Slider
          value={value}
          onChange={handleChange}
          orientation="vertical"
          sx={sliderStyles(selectedTheme)}
        />

        <TimeForm submitForm={filterByDate} onClick={resetData} />
      </ControllersContainer>
      <DataContainer>
        {chartData.map(el => {
          return (
            <MarketContainer theme={selectedTheme} key={el.id}>
              <MarketTitle>{el.name}</MarketTitle>
              <ChartContainer>
                <ResponsiveContainer debounce={100} width="60%" height={150}>
                  <LineChart
                    width={500}
                    height={200}
                    data={el.timeLine}
                    syncId="marketId"
                    isAnimationActive={false}
                  >
                    <XAxis
                      dataKey="date"
                      style={{ fill: selectedTheme.mainTextColor }}
                    />
                    <YAxis style={{ fill: selectedTheme.mainTextColor }} />
                    <Tooltip
                      labelStyle={{
                        color: selectedTheme.xLineGraph,
                      }}
                      itemStyle={{
                        color: selectedTheme.xLineGraph,
                      }}
                      contentStyle={{
                        backgroundColor: selectedTheme.tableBgColor,
                        border: `3px solid ${selectedTheme.borderColor}`,
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="totalQuantity"
                      stroke={selectedTheme.firstGraphColor}
                      fill={selectedTheme.secondGraphColor}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
                <ChartTable data={el} findTotal={findTotal} asin={asin} />
              </ChartContainer>
            </MarketContainer>
          );
        })}
      </DataContainer>
    </MainContainer>
  );
}
