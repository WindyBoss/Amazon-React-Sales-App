import mathRound from 'helpers/mathRound';
import React, { useContext, useEffect, useState } from 'react';
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

import { themeContext } from '../../../context/authContext';

export default function ComposedChartEl({
  data,
  children,
  sizes,
  chartOptions,
  fullData = false,
}) {
  const [chartIndex, setChartIndex] = useState(10);
  const { selectedTheme } = useContext(themeContext);

  useEffect(() => {
    data &&
      setChartIndex(fullData ? 0 : mathRound(data.length / 8, 1));
  }, [data, fullData]);

  return (
    <div style={{ position: 'relative', paddingTop: '50px' }}>
      {children}
      <ComposedChart
        width={sizes.width}
        height={sizes.height}
        data={data}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis
          dataKey={chartOptions.XAxisDataKey}
          scale="band"
          angle={10}
          interval={chartIndex}
          style={{ color: 'white' }}
        />
        <YAxis
          yAxisId="left"
          orientation="left"
          stroke={selectedTheme.xLineGraph}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          stroke={selectedTheme.yLineGraph}
        />
        <Tooltip />
        <Legend />
        <Bar
          dataKey={chartOptions.barDataKey}
          barSize={40}
          name="Total Quantity"
          yAxisId="left"
          fill={selectedTheme.firstGraphColor}
        />
        <Line
          type="monotone"
          dataKey={chartOptions.lineDataKey}
          yAxisId="right"
          stroke={selectedTheme.secondGraphColor}
          name="Total Sales EUR"
          dot={false}
        />
      </ComposedChart>
    </div>
  );
}
