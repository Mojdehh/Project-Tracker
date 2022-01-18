import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useApplicationData from "../hooks/useApplicationData";
import { Link } from "react-router-dom";

export default function BasicTable(props) {

  const pageLoad = useApplicationData();
  function refresh() {
    return pageLoad;
  }
  
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">{props.name}</TableCell>
            {props.number && (
              <TableCell align="center">{props.number}</TableCell>
            )}
            {props.priority && (
              <TableCell align="center">{props.priority}</TableCell>
            )}
            <TableCell align="center">{props.status}</TableCell>
            <TableCell align="center">{props.date}</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {props.list.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Link to={`/projects/${row.id}`}>{row.name}</Link>
              </TableCell>
              <TableCell align="right">{row.number_of_tickets}</TableCell>
              <TableCell align="right">{row.status}</TableCell>
              <TableCell align="right">{row.date_created}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
