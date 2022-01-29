import * as React from "react";
import { useParams, Link } from "react-router-dom";
import { formatDateTime } from "../Helper/dateHelperFuncs.ts"
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import useTicketsData from "../hooks/useTicketsData";
import TableContainer from "@mui/material/TableContainer";

export default function TicketsTable(props) {
  let { project_id } = useParams();
  const { tickets, setTickets } = useTicketsData(project_id);

  return (
    <Paper display="flex" elevation={4} justifyContent="center">
      <TableContainer style={{ maxHeight: 430 }} component={Paper}>
        <Table stickyHeader sx={{ minWidth: 500 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ backgroundColor: "#80cbc4" }} align="center">
                {props.name}
              </TableCell>
              {props.number && (
                <TableCell sx={{ backgroundColor: "#80cbc4" }} align="center">
                  {props.number}
                </TableCell>
              )}
              {props.priority && (
                <TableCell sx={{ backgroundColor: "#80cbc4" }} align="center">
                  {props.priority}
                </TableCell>
              )}
              {props.description && (
                <TableCell sx={{ backgroundColor: "#80cbc4" }} align="center">
                  {props.description}
                </TableCell>
              )}
              <TableCell sx={{ backgroundColor: "#80cbc4" }} align="center">
                {props.status}
              </TableCell>
              <TableCell sx={{ backgroundColor: "#80cbc4" }} align="center">
                {props.date}
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {props.tickets.map((row) => (
              <TableRow
                hover
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                role="checkbox"
                tabIndex={-1}
                key={row.code}
              >
                <TableCell align="center" component="th" scope="row">
                  <Link
                    style={{ textDecoration: "none", color: "black" }}
                    to={`/projects/${project_id}/tickets/${row.id}`}
                  >
                    {row.name}
                  </Link>
                </TableCell>
                <TableCell align="center">{row.priority}</TableCell>
                <TableCell align="center">{row.description}</TableCell>
                <TableCell align="center">{row.status}</TableCell>
                <TableCell align="center">
                  {formatDateTime(row.date_created)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}