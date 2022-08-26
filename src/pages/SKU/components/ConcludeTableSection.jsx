import {
  Table,
  TableCell,
  TableRow,
  TableHead,
  TableBody,
} from "@mui/material";
import { useContext } from "react";
import { themeContext } from "../../../context/authContext";

export default function ConcludeTableSection({ sku, findMarketName, asin }) {
  const { selectedTheme } = useContext(themeContext);
  return (
    <Table
      sx={{
        maxWidth: "500px",
        backgroundColor: selectedTheme.tableBgColor,
        border: `1px solid ${selectedTheme.tableBorderColor}`,
      }}
    >
      <TableHead
        sx={{
          border: `1px solid ${selectedTheme.tableBorderColor}`,
        }}
      >
        <TableRow
          sx={{
            backgroundColor: selectedTheme.tableHeaderBgColor,
            border: `1px solid ${selectedTheme.tableBorderColor}`,
          }}
        >
          <TableCell sx={cellStyles(selectedTheme)}>Headline</TableCell>
          <TableCell sx={cellStyles(selectedTheme)}>Information</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell sx={cellStyles(selectedTheme)}>SKU</TableCell>
          <TableCell sx={cellStyles(selectedTheme)}>{sku.id}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell sx={cellStyles(selectedTheme)}>
            Total Ordered Items
          </TableCell>
          <TableCell sx={cellStyles(selectedTheme)}>
            {sku.totalQuantity} items
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell sx={cellStyles(selectedTheme)}>Total Sales PLN</TableCell>
          <TableCell sx={cellStyles(selectedTheme)}>
            {sku.totalSalesPLN} PLN
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell sx={cellStyles(selectedTheme)}>Total Sales EUR</TableCell>
          <TableCell sx={cellStyles(selectedTheme)}>
            {sku.totalSalesEUR} EUR
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell sx={cellStyles(selectedTheme)}>Average Order</TableCell>
          <TableCell sx={cellStyles(selectedTheme)}>
            {sku.averageOrder}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell sx={cellStyles(selectedTheme)}>Main Market</TableCell>
          <TableCell sx={cellStyles(selectedTheme)}>
            {findMarketName(sku.mainMarket.marketName)} ( sold items:{" "}
            {sku.mainMarket.value.sum}, orders: {sku.mainMarket.value.count} )
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell sx={cellStyles(selectedTheme)}>ASIN</TableCell>
          <TableCell sx={cellStyles(selectedTheme)}>{asin}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

const cellStyles = (selectedTheme) => {
  return {
    color: selectedTheme.mainTextColor,
    border: `1px solid ${selectedTheme.tableBorderColor}`,
    fontFamily: "Oswald",
  };
};
