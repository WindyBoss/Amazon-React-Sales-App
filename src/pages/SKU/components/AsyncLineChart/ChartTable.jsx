import {
  Table,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Paper,
} from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";

import { styledPaper, styledCell, AmazonLink } from "./AsyncLineChart.styled";
import { useContext } from "react";
import { themeContext } from "../../../../context/authContext";

export default function ChartTable({ data, totalQuantity, asin }) {
  const { selectedTheme } = useContext(themeContext);
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
          {totalQuantity && typeof totalQuantity === "number" && (
            <TableCell sx={styledCell(selectedTheme)}>{totalQuantity}</TableCell>
          )}
        </TableRow>
        <TableRow>
          <TableCell sx={styledCell(selectedTheme)}>Amazon Link</TableCell>
          <TableCell sx={styledCell(selectedTheme)}>
            <AmazonLink
              href={`https://www.amazon.${
                data.id === "uk" ? "co.uk" : data.id
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
