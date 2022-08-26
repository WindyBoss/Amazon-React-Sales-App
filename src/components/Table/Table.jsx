import React, { useState, useEffect, useContext } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { themeContext } from "context/authContext";
import mathRound from "helpers/mathRound";

function createData(name, value, part) {
  return { name, value, part };
}

export default function CustomTable({ data }) {
  const [label, setLabel] = useState("");
  const [rows, setRows] = useState([]);

  const [total, SetTotal] = useState(0);

  const { selectedTheme } = useContext(themeContext);

  useEffect(() => {
    setLabel(data[0].feature);
    SetTotal(findTotal(data, "value"));
  }, [data]);

  useEffect(() => {
    setRows([
      ...data.map((el) => {
        return createData(
          el.name,
          el.value,
          `${Math.round((el.value / total) * 10000) / 100}%`
        );
      }),
      createData("Total", mathRound(total, 100), "100%"),
    ]);
  }, [data, total]);

  function findTotal(data, criteria) {
    const array = [];

    data.forEach((el) => {
      array.push(el[criteria]);
    });

    return array.reduce((acc, el) => acc + el, 0);
  }

  return (
    <Table sx={{ maxWidth: "100%" }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell sx={cellStyles(selectedTheme, true)}>Market</TableCell>
          <TableCell sx={cellStyles(selectedTheme, true)} align="right">
            {label}
          </TableCell>
          <TableCell
            sx={cellStyles(selectedTheme, true)}
            align="right"
          >{`Rate [%]`}</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow
            key={row.name}
            sx={{
              backgroundColor:
                row.name === "Total"
                  ? selectedTheme.activeLinkColor
                  : "transparent",
            }}
          >
            <TableCell
              sx={cellStyles(selectedTheme)}
              component="th"
              scope="row"
            >
              {row.name}
            </TableCell>
            <TableCell sx={cellStyles(selectedTheme)} align="right">
              {row.value}
            </TableCell>
            <TableCell sx={cellStyles(selectedTheme)} align="right">
              {row.part}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

const cellStyles = (selectedTheme, header) => {
  return {
    color: selectedTheme.mainTextColor,
    border: `1px solid ${selectedTheme.tableBorderColor}`,
    backgroundColor: header && selectedTheme.tableHeaderBgColor,
    fontFamily: 'Oswald',
  };
};
