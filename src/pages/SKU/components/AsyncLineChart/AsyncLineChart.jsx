import React, { useContext, useEffect, useState } from "react";
import { XAxis, YAxis, Tooltip, Line, LineChart } from "recharts";
import Slider from "@mui/material/Slider";

import ChartTable from "./ChartTable";
import {
  ChartContainer,
  MarketContainer,
  sliderStyles,
} from "./AsyncLineChart.styled";
import { themeContext } from "../../../../context/authContext";

export default function AsyncLineChart({ data, asin }) {
  const [filteredTotalAmount, setFilteredTotalAmount] = useState(data);
  const [value, setValue] = React.useState([0, 100]);
  const [chartData, setChartData] = React.useState(data);

  const { selectedTheme } = useContext(themeContext);

  function handleChange(e, newValue) {
    const totalValue = [];
    const newData = {
      id: data.id,
      name: data.name,
      timeLine: [],
      totalQuantity: data.totalQuantity,
    };
    setValue(newValue);
    for (
      let i = Math.round(
        newValue[0] === 100
          ? 0 + data.timeLine.length * 0.01 * 99
          : 0 + data.timeLine.length * 0.01 * newValue[0]
      );
      i < Math.round(data.timeLine.length * 0.01 * newValue[1]);
      i++
    ) {
      newData.timeLine.push(data.timeLine[i]);
      totalValue.push(data.timeLine[i].totalQuantity);
    }

    setChartData(newData);

    setFilteredTotalAmount(
      newValue[0] === 0 && newValue[1] === 100
        ? data.totalQuantity
        : totalValue.reduce((acc, el) => acc + el, 0)
    );
  }

  useEffect(() => {
    setFilteredTotalAmount(data.totalQuantity);
    setChartData(data);
  }, [data]);

  return (
    <MarketContainer theme={selectedTheme}>
      <h4>{chartData.name}</h4>
      <ChartContainer key={chartData.id}>
        <div>
          <LineChart
            width={370}
            height={220}
            data={chartData.timeLine}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
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
            />{" "}
            <Line
              type="monotone"
              dataKey="totalQuantity"
              stroke={selectedTheme.firstGraphColor}
              // fill={selectedTheme.firstGraphColor}
              dot={false}
            />
          </LineChart>
          <Slider
            value={value}
            onChange={handleChange}
            sx={sliderStyles(selectedTheme)}
          />
        </div>
        <ChartTable data={data} asin={asin} totalQuantity={filteredTotalAmount} />
      </ChartContainer>
    </MarketContainer>
  );
}
