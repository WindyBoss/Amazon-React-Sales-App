import {
  Table,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@mui/material';
import { useContext, useEffect, useState } from 'react';

import {
  styledPaper,
  styledCell,
  AmazonLink,
} from './SynchronizedLineChart.styled';

import LinkIcon from '@mui/icons-material/Link';
import { themeContext } from 'context/authContext';

export default function ChartTable({ data, findTotal, asin }) {
  const [total, setTotal] = useState(0);

  const { selectedTheme } = useContext(themeContext);

  useEffect(() => {
    data.timeLine.length > 0 &&
      setTotal(findTotal(data.timeLine, data.totalQuantity));
  }, [data, findTotal]);

  return (
    <Table sx={styledPaper}>
      <TableHead>
        <TableRow>
          <TableCell sx={styledCell(selectedTheme)}>Data Type</TableCell>
          <TableCell sx={styledCell(selectedTheme)}>Information</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell sx={styledCell(selectedTheme)}>Market</TableCell>
          <TableCell sx={styledCell(selectedTheme)}>{data.name}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell sx={styledCell(selectedTheme)}>
            Total Ordered Items
          </TableCell>
          <TableCell sx={styledCell(selectedTheme)}>
            {data.totalQuantity}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell sx={styledCell(selectedTheme)}>
            Filtered Ordered Items
          </TableCell>
          <TableCell sx={styledCell(selectedTheme)}>{total}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell sx={styledCell(selectedTheme)}>Amazon Link</TableCell>
          <TableCell sx={styledCell(selectedTheme)}>
            <AmazonLink
              href={`https://www.amazon.${
                data.id === 'uk' ? 'co.uk' : data.id
              }/dp/${asin}`}
              rel="noreferrer"
              target="_blank"
            >
              <LinkIcon />
            </AmazonLink>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
