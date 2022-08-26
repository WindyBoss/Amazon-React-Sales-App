import CustomPieChart from 'components/Charts/CustomPieChart';
import FormPieChart from './FormPieChart';
import CustomTable from 'components/Table';
import { PieContainer, PieChartContainer } from '../../../styles/Total.styled';

import TimeForm from 'components/TimeForm';

export default function PieChartComponent({
  monthData,
  options,
  onChange,
  formDate,
  submitForm,
  onClick,
}) {
  return (
    <PieContainer>
      <h2>{options.find(opt => opt.value === formDate).label}</h2>
      

      <PieChartContainer>
        <CustomPieChart
          sizes={{
            width: 1000,
            height: 400,
            innerRadius: 100,
            outerRadius: 150,
            cx: '40%',
            cy: '50%',
          }}
          data={monthData}
        />
      </PieChartContainer>
      <TimeForm
        position={{
          minWidth: '200px',
          maxHeight: 300,
          marginRight: 50,
          marginTop: 100,
        }}
        submitForm={submitForm}
        onClick={onClick}
      >
        <FormPieChart
          onChange={onChange}
          options={options}
          label="Comparison Feature"
        />
      </TimeForm>
      <CustomTable data={monthData}></CustomTable>
    </PieContainer>
  );
}
