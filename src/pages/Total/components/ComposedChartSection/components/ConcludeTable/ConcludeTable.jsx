import React, { useState, useEffect, useContext } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { themeContext } from 'context/authContext';
import mathRound from 'helpers/mathRound';

import { TableContainer, tableCellStyles } from './ConcludeTable.styled';

export default function ConcludeTable({ data }) {
  const { selectedTheme } = useContext(themeContext);
  const [rows, setRows] = useState([]);

  function findSum(data, param) {
    return data.reduce((el, row) => el + row[param], 0);
  }

  useEffect(() => {
    if (!data) {
      return;
    }

    const tableData = [
      {
        data: mathRound(findSum(data, 'totalQuantity'), 100),
        name: 'Sold Items',
      },
      {
        data: mathRound(findSum(data, 'totalSalesEUR'), 100),
        name: 'Sales EUR',
      },
      {
        data: mathRound(findSum(data, 'totalSalesPLN'), 100),
        name: 'Sales PLN',
      },
    ];

    setRows(tableData);
  }, [data]);

  return (
    <TableContainer theme={selectedTheme}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell sx={tableCellStyles(selectedTheme, true)}>
              Definition
            </TableCell>
            <TableCell sx={tableCellStyles(selectedTheme, true)}>
              Chosen Period Data
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, idx) => {
            return (
              <TableRow key={idx}>
                <TableCell sx={tableCellStyles(selectedTheme)}>
                  {row.name}
                </TableCell>
                <TableCell sx={tableCellStyles(selectedTheme)}>
                  {row.data}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
