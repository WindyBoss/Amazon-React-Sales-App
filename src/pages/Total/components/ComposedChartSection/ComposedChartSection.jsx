import { useState, useEffect } from 'react';
import ComposedChartComponent from 'components/Charts/ComposedChartElComponent/ComposedChartComponent';
import { withApiState } from 'service/stateMachine';
import { useFetch } from 'hooks/useFetch';
import { getData } from 'service/apiService';
import SectionContainer from 'components/SectionContainer';
import Pending from 'components/Pending';
import SelectTimeType from 'components/SelectTimeType';
import TimeForm from 'components/TimeForm';
import { useSearchParams } from 'react-router-dom';

import InfoTable from './components/InfoTable/InfoTable';
import ConcludeTable from './components/ConcludeTable';

const addStyle = {
  minWidth: '200px',
  marginTop: '20px',
};

function ComposedChartSection({ apiState }) {
  const [dataType, setDataType] = useState('days');
  const [mainData, setMainData] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();

  function showChartOptions() {
    return {
      XAxisDataKey: dataType === 'weeks' ? 'weekName' : 'id',
      barDataKey: 'totalQuantity',
      lineDataKey: 'totalSalesEUR',
    };
  }

  const data = useFetch({
    apiState: apiState,
    fetchAPI: getData,
    param: !searchParams.get('time') ? 'days' : searchParams.get('time'),
  });

  useEffect(() => {
    data.length > 0 && setMainData(data);
  }, [data]);

  function checkDataType(timePeriod) {
    if (timePeriod === '') {
      return;
    }

    setSearchParams({ time: timePeriod });
    setDataType(timePeriod);
  }

  function filterByDate(timePeriod) {
    let newData = [];

    dataType === 'days'
      ? (newData = data.filter(
          day =>
            new Date(day.currentDate).getTime() <= timePeriod.max &&
            new Date(day.currentDate).getTime() >= timePeriod.min
        ))
      : (newData = data.filter(
          month =>
            new Date(month.minDate).getTime() <= timePeriod.max &&
            new Date(month.maxDate).getTime() >= timePeriod.min
        ));

    setMainData(newData);
  }

  function resetFilter() {
    setMainData(data);
  }

  return (
    <SectionContainer
      addStyle={{
        minHeight: '1100px',
        display: 'flex',
        position: 'relative',
      }}
      id="date-comparison"
    >
      <TimeForm
        dataType={dataType}
        submitForm={filterByDate}
        onClick={resetFilter}
        position={{
          minWidth: '200px',
          maxHeight: '300px',
          marginTop: '30px',
          marginRight: '50px',
          position: 'sticky',
          right: 30,

          top: 200,
        }}
      >
        <SelectTimeType onChange={checkDataType} addStyle={addStyle} />
      </TimeForm>

      {apiState.isPending() && <Pending />}
      {apiState.isSuccess() && mainData.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <ComposedChartComponent
            data={mainData}
            chartOptions={showChartOptions()}
            sizes={{ width: 1300, height: 300 }}
          />
          <div style={{ display: 'flexbox' }}>
            <ConcludeTable data={mainData} />
            <InfoTable data={mainData} dataType={dataType} />
          </div>
        </div>
      )}
    </SectionContainer>
  );
}

export default withApiState(ComposedChartSection);
