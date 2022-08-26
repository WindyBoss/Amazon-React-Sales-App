import FilterListIcon from '@mui/icons-material/FilterList';

import { TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';

import { TextField } from '@mui/material';
import { tableCellStyles } from 'pages/Total/components/WeekDaysStats/WeekDays.styled';
import { themeContext } from 'context/authContext';
import { useContext } from 'react';

export default function TableHeader({
  isOpenModal,
  toggleModal,
  onChange,
  handleSort,
  sortBy,
  sort,
  createHeadLine,
  markets,
}) {
  const { selectedTheme } = useContext(themeContext);

  return (
    <TableHead sx={{ position: 'sticky', top: '120px', zIndex: 0 }}>
      <TableRow>
        {createHeadLine(markets).map(headCell => {
          return (
            <TableCell
              key={headCell.id}
              sx={tableCellStyles(selectedTheme, true)}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <TableSortLabel
                  direction={sortBy === headCell.id ? sort : 'asc'}
                  onClick={handleSort(headCell.id)}
                >
                  {headCell.label}
                </TableSortLabel>
                {headCell.filter && (
                  <>
                    <FilterListIcon onClick={toggleModal} />
                    {isOpenModal && (
                      <span style={{ marginLeft: '10px' }}>
                        <TextField
                          label="filter SKU"
                          size="small"
                          onChange={onChange}
                        />
                      </span>
                    )}
                  </>
                )}
              </div>
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
}
