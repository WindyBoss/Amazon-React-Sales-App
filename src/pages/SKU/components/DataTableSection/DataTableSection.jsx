import {
  Table,
  TableCell,
  TableRow,
  TableHead,
  Paper,
  TableBody,
} from '@mui/material';
import { useCallback, useContext } from 'react';
import filterData from '../../helpers/filterData';
import months from 'data/month';

import SelectTimeType from 'components/SelectTimeType';

import TimeForm from 'components/TimeForm';
import { themeContext } from 'context/authContext';

import {
  TableSectionContainer,
  TableStickyContainer,
  styledCell,
  styledPaper,
  ConclusionTableContainer,
  ConclusionTitle,
  ConclusionEl,
} from '../../styles/SKU.styled';

import SectionContainer from 'components/SectionContainer';
import { useState } from 'react';
import { useEffect } from 'react';

const addStyle = {
  minWidth: '150px',
  marginTop: '20px',
};

const dataTypeOptions = [
  { name: 'days', feature: 'dayData' },
  // { name: 'months', feature: 'monthsData' },
  { name: 'weeks', feature: 'weekData' },
];

export default function DataTableSection({ data, markets }) {
  const { selectedTheme } = useContext(themeContext);

  console.log(data);

  const [total, setTotal] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [monthsData, setMonthData] = useState([]);
  const [dayData, setDayData] = useState([]);
  const [weekData, setWeekData] = useState([]);

  const [dataType, setDataType] = useState('days');

  function findMarketTotal(marketName) {
    const total = [];
    tableData.forEach(day => {
      const marketSales = day.markets.filter(
        market => market.marketId === marketName
      );

      marketSales.forEach(market => {
        total.push(market.totalQuantity);
      });
    });

    return total.reduce((acc, num) => acc + num, 0);
  }

  function resetTableData() {
    setTableData(data[0].dayData);
    setTotal(data[0].dayData.reduce((acc, day) => acc + day.totalQuantity, 0));
  }

  const mainTableFilter = useCallback(
    timePeriod => {
      const newData = filterData({
        max: timePeriod.max,
        min: timePeriod.min,
        data: data,
        months: months.months,
      });
      setTableData(newData);
      setTotal(newData.reduce((acc, day) => acc + day.totalQuantity, 0));
    },
    [data]
  );

  useEffect(() => {
    if (!data || data.length === 0) {
      return;
    }

    setTableData(data[0].dayData);

    setMonthData(data[0].monthsData.flat(1));
    setDayData(data[0].dayData);
    setWeekData(data[0].weekData);
  }, [data, dataType]);

  useEffect(() => {
    // dataType === 'month' && setTableData(monthsData);
    // dataType === 'days' && setTableData(dayData);
    // dataType === 'weeks' && setTableData(weekData);

    setTableData([]);


    // console.log(monthsData);
    // switch (dataType) {
    //   case 'months':
    //     setTableData(monthsData);
    //     break;
    //   case 'days':
    //     setTableData(dayData);
    //     break;
    //   case 'weeks':
    //     setTableData(weekData);
    //     break;

    //   default:
    //     setTableData([]);
    //     return;
    //   // setTableData(dayData);
    // }
  }, [dataType, dayData, monthsData, weekData]);

  console.log(tableData);

  console.log(dataType);

  return (
    <SectionContainer>
      <TableSectionContainer name="dataTable">
        <TableStickyContainer theme={selectedTheme}>
          <TimeForm submitForm={mainTableFilter} onClick={resetTableData}>
            <SelectTimeType onChange={setDataType} addStyle={addStyle} />
          </TimeForm>
          <ConclusionTableContainer theme={selectedTheme}>
            <ConclusionTitle>Conclude</ConclusionTitle>
            <ConclusionEl>
              <p style={{ marginRight: '20px' }}>Total</p>
              <p>{total}</p>
            </ConclusionEl>
            {markets.map(market => {
              return (
                <ConclusionEl key={market.id}>
                  <p style={{ marginRight: '20px' }}>{market.fullName}</p>
                  <p>{tableData.length > 0 && findMarketTotal(market.id)}</p>
                </ConclusionEl>
              );
            })}
          </ConclusionTableContainer>
        </TableStickyContainer>
        <Paper sx={styledPaper(selectedTheme)}>
          <h2>Data Table</h2>

          <Table>
            <TableHead
              sx={{
                position: 'sticky',
                top: '90px',
                backgroundColor: selectedTheme.tableHeaderBgColor,
              }}
            >
              <TableRow>
                <TableCell sx={styledCell(selectedTheme, true)}>Date</TableCell>
                {markets.map(market => {
                  return (
                    <TableCell
                      sx={styledCell(selectedTheme, true)}
                      key={`${market.id}-mainTableHead`}
                    >
                      {market.fullName}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData &&
                dayData.map(day => {
                  const dayId =
                    dataType === 'months' ? `${day.id}/${day.yearId}` : day.id;
                  console.log(day);
                  return (
                    <TableRow key={dayId}>
                      <TableCell sx={styledCell(selectedTheme)} size="small">
                        {dayId}
                      </TableCell>
                      {day.markets.map(market => {
                        return (
                          <TableCell
                            size="small"
                            key={`${market.marketId}/${dayId}`}
                            sx={styledCell(selectedTheme)}
                          >
                            {market.totalQuantity}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </Paper>
      </TableSectionContainer>
    </SectionContainer>
  );
}
