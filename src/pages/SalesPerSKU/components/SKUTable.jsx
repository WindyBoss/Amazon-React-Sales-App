import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { NavLink } from 'react-router-dom';

import TimeForm from '../../../components/TimeForm';
import TableHeader from './TableHeader';

import LeftPanelSumUp from './LeftPanelSumUp';
import { useContext, useEffect, useRef, useState } from 'react';

import { tableCellStyles, TableContainer } from '../styles/SalesPerSku.styled';
import { themeContext } from 'context/authContext';

import { getCurrency } from 'service/apiService';
import { useFetch } from 'hooks/useFetch';
import mathRound from 'helpers/mathRound';

export default function SKUTable({
  handleSubmit,
  resetFilter,
  isOpenModal,
  toggleFilter,
  handleChange,
  handleSort,
  sortBy,
  sort,
  createHead,
  filteredSumUpRow,
  markets,
  stableSort,
  filteredTableRows,
  getComparator,
  onHover,
  hover,
  rates = null,
}) {
  const myRef = useRef(null);


  const { selectedTheme } = useContext(themeContext);

  const [hoveredItem, setHoveredItem] = useState(null);

  const [coordinates, setCoordinates] = useState(null);
  const [number, setNumber] = useState(0);

  

  useEffect(() => {
    if (hoveredItem === null) {
      return;
    };

    setCoordinates(hoveredItem.getBoundingClientRect());
    rates && setNumber(mathRound(Number(hoveredItem.textContent) / rates.rates.EUR, 100));
  }, [hoveredItem]);

  return (
    <div style={{ display: 'flex' }}>
      <TimeForm
        submitForm={handleSubmit}
        onClick={resetFilter}
        position={{ position: 'fixed', left: 5, top: 120 }}
      >
        <LeftPanelSumUp filteredSumUpRow={filteredSumUpRow} />
      </TimeForm>
      <TableContainer
        theme={selectedTheme}
        style={{ minWidth: '80%', marginLeft: '200px' }}
      >
        <Table>
          <TableHeader
            isOpenModal={isOpenModal}
            toggleModal={toggleFilter}
            onChange={handleChange}
            handleSort={handleSort}
            sortBy={sortBy}
            sort={sort}
            createHeadLine={createHead}
            markets={markets}
            sumUpRow={filteredSumUpRow}
          />
          <TableBody>
            {stableSort(filteredTableRows, getComparator(sort, sortBy)).map(
              row => {
                return (
                  <TableRow key={row.sku}>
                    <TableCell sx={tableCellStyles(selectedTheme)}>
                      <NavLink to={`${row.sku}`}>{row.sku}</NavLink>
                    </TableCell>
                    <TableCell
                      sx={tableCellStyles(selectedTheme)}
                      onMouseEnter={e => {
                        setHoveredItem(e.target);
                        // console.log(e);
                        onHover(true);
                      }}
                    >
                      {row.totalQuantity}
                    </TableCell>
                    <TableCell
                      sx={tableCellStyles(selectedTheme)}
                      onMouseEnter={e => {
                        setHoveredItem(e.target);
                        onHover(true);
                      }}
                    >
                      {row.de}
                    </TableCell>
                    <TableCell
                      sx={tableCellStyles(selectedTheme)}
                      onMouseEnter={e => {
                        setHoveredItem(e.target);
                        onHover(true);
                      }}
                    >
                      {row.fr}
                    </TableCell>
                    <TableCell
                      sx={tableCellStyles(selectedTheme)}
                      onMouseEnter={e => {
                        setHoveredItem(e.target);
                        onHover(true);
                      }}
                    >
                      {row.uk}
                    </TableCell>
                    <TableCell
                      sx={tableCellStyles(selectedTheme)}
                      onMouseEnter={e => {
                        setHoveredItem(e.target);
                        onHover(true);
                      }}
                    >
                      {row.it}
                    </TableCell>
                    <TableCell
                      sx={tableCellStyles(selectedTheme)}
                      onMouseEnter={e => {
                        setHoveredItem(e.target);
                        onHover(true);
                      }}
                    >
                      {row.es}
                    </TableCell>
                    <TableCell
                      sx={tableCellStyles(selectedTheme)}
                      onMouseEnter={e => {
                        setHoveredItem(e.target);
                        onHover(true);
                      }}
                    >
                      {row.nl}
                    </TableCell>
                    <TableCell
                      sx={tableCellStyles(selectedTheme)}
                      onMouseEnter={e => {
                        setHoveredItem(e.target);
                        onHover(true);
                      }}
                    >
                      {row.pl}
                    </TableCell>
                    <TableCell
                      sx={tableCellStyles(selectedTheme)}
                      onMouseEnter={e => {
                        setHoveredItem(e.target);
                        onHover(true);
                      }}
                    >
                      {row.se}
                    </TableCell>
                  </TableRow>
                );
              }
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {hover && coordinates && (
        <span
          style={{
            position: 'absolute',
            top: `${Math.round(coordinates.y) + 10}px`,
            left: `${Math.round(coordinates.x) + 10}px`,
          }}
        >
          <Paper sx={{ width: '150px', height: '150px' }}>
            <ul>
              <li>{number}</li>
              <li>{number}</li>
            </ul>
          </Paper>
        </span>
      )}
    </div>
  );
}
