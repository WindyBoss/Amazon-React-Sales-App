import weekDays from 'data/weekDays';

import React, { useContext } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { themeContext } from 'context/authContext';
import mathRound from 'helpers/mathRound';

import { TableContainer, tableCellStyles } from './../WeekDays.styled';

export default function StatsTable({ data }) {
  const { selectedTheme } = useContext(themeContext);
  return (
    <TableContainer theme={selectedTheme}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={tableCellStyles(selectedTheme, true)}>
              Week Day
            </TableCell>
            {data.map(day => {
              return (
                <TableCell
                  key={day.id}
                  sx={tableCellStyles(selectedTheme, true)}
                >
                  {day.dayName}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell sx={tableCellStyles(selectedTheme)}>
              Ordered Items
            </TableCell>
            {data.map(day => {
              return (
                <TableCell key={day.id} sx={tableCellStyles(selectedTheme)}>
                  {day.totalQuantity}
                </TableCell>
              );
            })}
          </TableRow>
          <TableRow>
            <TableCell sx={tableCellStyles(selectedTheme)}>Sales EUR</TableCell>
            {data.map(day => {
              return (
                <TableCell key={day.id} sx={tableCellStyles(selectedTheme)}>
                  {day.totalSalesEUR}
                </TableCell>
              );
            })}
          </TableRow>
          <TableRow>
            <TableCell sx={tableCellStyles(selectedTheme)}>Sales PLN</TableCell>
            {data.map(day => {
              return (
                <TableCell key={day.id} sx={tableCellStyles(selectedTheme)}>
                  {mathRound(day.totalSalesPLN, 100)}
                </TableCell>
              );
            })}
          </TableRow>
          <TableRow>
            <TableCell sx={tableCellStyles(selectedTheme)}>
              Order Number
            </TableCell>
            {data.map(day => {
              return (
                <TableCell key={day.id} sx={tableCellStyles(selectedTheme)}>
                  {day.totalOrderNumber}
                </TableCell>
              );
            })}
          </TableRow>
          <TableRow>
            <TableCell sx={tableCellStyles(selectedTheme)}>
              Average Daily Sold Items
            </TableCell>
            {data.map(day => {
              return (
                <TableCell key={day.id} sx={tableCellStyles(selectedTheme)}>
                  {day.averageTotalQuantity}
                </TableCell>
              );
            })}
          </TableRow>
          <TableRow>
            <TableCell sx={tableCellStyles(selectedTheme)}>
              Average Daily Sales EUR
            </TableCell>
            {data.map(day => {
              return (
                <TableCell key={day.id} sx={tableCellStyles(selectedTheme)}>
                  {day.AverageTotalSalesEUR}
                </TableCell>
              );
            })}
          </TableRow>
          <TableRow>
            <TableCell sx={tableCellStyles(selectedTheme)}>
              Average Daily Sales PLN
            </TableCell>
            {data.map(day => {
              return (
                <TableCell key={day.id} sx={tableCellStyles(selectedTheme)}>
                  {day.averageTotalSalesPLN}
                </TableCell>
              );
            })}
          </TableRow>
          <TableRow>
            <TableCell sx={tableCellStyles(selectedTheme)}>
              Average Daily Order Number
            </TableCell>
            {data.map(day => {
              return (
                <TableCell key={day.id} sx={tableCellStyles(selectedTheme)}>
                  {day.averageOrderNumber}
                </TableCell>
              );
            })}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
