import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useTicketsData from "../hooks/useTicketsData";
import { useParams } from "react-router-dom";

export default function TicketsTable(props) {
  let { project_id } = useParams();
  console.log(project_id);
  const tickets = useTicketsData(project_id);

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
            {props.description && (
              <TableCell align="center">{props.description}</TableCell>
            )}
            <TableCell align="center">{props.status}</TableCell>
            <TableCell align="center">{props.date}</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {tickets.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.priority}</TableCell>
              <TableCell align="right">{row.description}</TableCell>
              <TableCell align="right">{row.status}</TableCell>
              <TableCell align="right">{row.date_created}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
