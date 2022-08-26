import React, { useContext } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { themeContext } from 'context/authContext';

import {
  tableCellStyles,
  TableContainer,
} from '../../ComposedChartSection/components/ConcludeTable/ConcludeTable.styled';
import mathRound from 'helpers/mathRound';

export default function CategoryTable({ data }) {
  const { selectedTheme } = useContext(themeContext);

  return (
    <TableContainer
      theme={selectedTheme}
      style={{ maxWidth: '100%', marginTop: '-50px' }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={tableCellStyles(selectedTheme, true)}>
              Category
            </TableCell>
            <TableCell sx={tableCellStyles(selectedTheme, true)}>
              Ordered Items
            </TableCell>
            <TableCell sx={tableCellStyles(selectedTheme, true)}>
              Sales EUR
            </TableCell>
            <TableCell sx={tableCellStyles(selectedTheme, true)}>
              Sales PLN
            </TableCell>
            <TableCell sx={tableCellStyles(selectedTheme, true)}>
              Take Part Rates
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(category => {
            const total = mathRound(
              category.totalQuantity /
                data.reduce((acc, category) => acc + category.totalQuantity, 0),
              10000
            );
            return (
              <TableRow key={category.id}>
                <TableCell sx={tableCellStyles(selectedTheme)}>
                  {category.id}
                </TableCell>
                <TableCell sx={tableCellStyles(selectedTheme)}>
                  {category.totalQuantity}
                </TableCell>
                <TableCell sx={tableCellStyles(selectedTheme)}>
                  {category.totalSalesEUR}
                </TableCell>
                <TableCell sx={tableCellStyles(selectedTheme)}>
                  {category.totalSalesPLN}
                </TableCell>
                <TableCell sx={tableCellStyles(selectedTheme)}>
                  {(100 * total).toString().slice(0, total < 0.1 ? 4 : 5) + '%'}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
