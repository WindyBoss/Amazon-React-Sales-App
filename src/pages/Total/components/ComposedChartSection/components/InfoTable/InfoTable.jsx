import React, { useState, useEffect, useContext } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { themeContext } from 'context/authContext';

import { TableContainer, tableCellStyles } from './InfoTable.styled';

const tableHeader = ['Date', 'Total items', 'Average Order', 'Sales EUR'];

function createData(name, totalQuantity, averageOrder, totalSalesEUR) {
  return [name, totalQuantity, averageOrder, totalSalesEUR];
}

export default function InfoTable({ data, dataType }) {
  const [rows, setRows] = useState([]);

  const { selectedTheme } = useContext(themeContext);

  useEffect(() => {
    if (!data) {
      return;
    }
  }, [data]);

  useEffect(() => {
    setRows([
      ...data.map(el => {
        return createData(
          dataType === 'weeks' ? el.weekName : el.id,
          el.totalQuantity,
          el.averageOrder,
          el.totalSalesEUR
        );
      }),
    ]);
  }, [data, dataType]);

  return (
    <TableContainer theme={selectedTheme}>
      <Table stickyHeader>
        <TableHead>
          <TableRow sx={{ backgroundColor: 'white' }}>
            {tableHeader.map((el, idx) => {
              return (
                <TableCell sx={tableCellStyles(selectedTheme, true)} key={idx}>
                  {el}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row, idx) => {
            return (
              <TableRow key={idx}>
                {row.map((el, elIdx) => {
                  return (
                    <TableCell sx={tableCellStyles(selectedTheme)} key={elIdx}>
                      {el}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
