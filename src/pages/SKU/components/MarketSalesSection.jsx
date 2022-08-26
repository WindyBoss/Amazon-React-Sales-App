import Switch from '@mui/material/Switch';
import AsyncLineChart from './AsyncLineChart';
import SynchronizedLineChart from './SynchronizedLineChart';

import {
  CheckboxContainer,
  AsyncLineChartContainer,
  MainInfoContainer,
} from '../styles/SKU.styled';

import SectionContainer from '../../../components/SectionContainer';
import { useContext } from 'react';
import { themeContext } from '../../../context/authContext';

export default function MarketSalesSection({
  label,
  onChange,
  data,
  asyncChart,
  asin,
}) {
  const { selectedTheme } = useContext(themeContext);

  return (
    <SectionContainer name="marketSalesSelection">
      <MainInfoContainer theme={selectedTheme}>
        <h2>Market Comparison</h2>

        <CheckboxContainer theme={selectedTheme}>
          <Switch
            onChange={onChange}
            {...label}
            defaultChecked
            size="small"
            sx={{
              color: selectedTheme.mainTextColor,
              marginRight: '10px',
              'span.Mui-checked': {
                color: selectedTheme.checkBoxColor,

                '+.MuiSwitch-track':{
                  backgroundColor: selectedTheme.checkBoxColor,
                }
              },
            }}
          />
          <p>Synchronized Charts</p>
        </CheckboxContainer>
      </MainInfoContainer>
      {!asyncChart ? (
        <SynchronizedLineChart asin={asin} data={data} />
      ) : (
        <AsyncLineChartContainer>
          {data.map(market => {
            return <AsyncLineChart asin={asin} key={market.id} data={market} />;
          })}
        </AsyncLineChartContainer>
      )}
    </SectionContainer>
  );
}
