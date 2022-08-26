import React, { useContext } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { themeContext } from 'context/authContext';

import { tableCellStyles } from '../../../ComposedChartSection/components/ConcludeTable/ConcludeTable.styled';

export default function MarketTable({ data }) {
  const { selectedTheme } = useContext(themeContext);

  return (
    <Table
      sx={{
        border: `1px solid ${selectedTheme.tableBorderColor}`,
        borderRadius: '5px',
      }}
    >
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
        <TableRow>
          <TableCell sx={tableCellStyles(selectedTheme)}>
            Ordered Items
          </TableCell>
          <TableCell sx={tableCellStyles(selectedTheme)}>
            {data.totalQuantity}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell sx={tableCellStyles(selectedTheme)}>Sales EUR</TableCell>
          <TableCell sx={tableCellStyles(selectedTheme)}>
            {data.totalSalesEUR}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell sx={tableCellStyles(selectedTheme)}>Sales PLN</TableCell>
          <TableCell sx={tableCellStyles(selectedTheme)}>
            {data.totalSalesPLN}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell sx={tableCellStyles(selectedTheme)}>
            Sales Local Currency
          </TableCell>
          <TableCell sx={tableCellStyles(selectedTheme)}>
            {data.totalSalesLocalCurrency}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
