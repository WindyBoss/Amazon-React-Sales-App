import CustomPieChart from "components/Charts/CustomPieChart";
import CustomTable from "components/Table";

import { PieContainer, PieChartContainer } from "../styles/SKU.styled";
import FormPieChart from "./FormPieChart";

export default function PieChartComponent({
  monthData,
  options,
  onChange,
  formDate,
}) {
  console.log(monthData);
  return (
    <PieContainer>
      {/* <h2>{options.find((opt) => opt.value === formDate).label}</h2> */}
      {/* <FormPieChart
        onChange={onChange}
        options={options}
        label="Comparison Feature"
      /> */}
      <PieChartContainer>
        <CustomPieChart
          sizes={{
            width: 1000,
            height: 400,
            innerRadius: 100,
            outerRadius: 150,
            cx: "40%",
            cy: "50%",
          }}
          data={monthData}
        />
      </PieChartContainer>
      <CustomTable data={monthData} />
    </PieContainer>
  );
}
