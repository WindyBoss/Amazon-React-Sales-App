import CustomPieChart from 'components/Charts/CustomPieChart';
import { useEffect, useState } from 'react';
import FormPieChart from './FormPieChart';

const options = [
  { value: 'totalQuantity', label: 'Total Ordered Item' },
  { value: 'totalSalesPLN', label: 'Total Sales PLN' },
  { value: 'totalSalesEUR', label: 'Total Sales EUR' },
];

export default function PieChart({ data }) {
  const [chartData, setChartData] = useState(null);
  const [dataType, setDataType] = useState('totalQuantity');

  useEffect(() => {
    console.log(data);

    const newData = data.map(category => {
      return {
        value: category[dataType],
        name: category.categoryName,
        feature: 'totalQuantity',
        currency: '',
      };
    });

    setChartData(newData);
  }, [data, dataType]);

  function handleChange(dataType) {
    setDataType(dataType);
  }

  return (
    <div>
      {chartData && (
        <>
          <FormPieChart
            onChange={handleChange}
            options={options}
            label="Select chart Data"
          />
          <CustomPieChart
            sizes={{
              width: 1000,
              height: 400,
              innerRadius: 100,
              outerRadius: 150,
              cx: '40%',
              cy: '50%',
            }}
            data={chartData}
          />
        </>
      )}
    </div>
  );
}

// feature: 'Total Ordered Item';
// name: 'France';
// value: 24097;
