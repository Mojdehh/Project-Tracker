import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useTicketsData from "../hooks/useTicketsData";
import { useParams, Link } from "react-router-dom";

export default function TicketsTable(props) {
  let { project_id } = useParams();
   const { tickets, setTickets } = useTicketsData(project_id);

  // console.log(project_id);
  //const tickets = useTicketsData(project_id);
  console.log("!! PROPS", props);

  return (
    <TableContainer
      component={Paper}>
      {/* style={{ display: "flex", justifyContent: "center" }}
    > */}
      <Table
      // mt: 3, mb: 2, display: "block", width: "75vw",
        sx={{ minWidth: 650 }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <TableCell sx={{ backgroundColor: '#80cbc4'}}  align="center">{props.name}</TableCell>
            {props.number && (
              <TableCell sx={{ backgroundColor: '#80cbc4'}}  align="center">{props.number}</TableCell>
            )}
            {props.priority && (
              <TableCell sx={{ backgroundColor: '#80cbc4'}}  align="center">{props.priority}</TableCell>
            )}
            {props.description && (
              <TableCell sx={{ backgroundColor: '#80cbc4'}}  align="center">{props.description}</TableCell>
            )}
            <TableCell sx={{ backgroundColor: '#80cbc4'}}  align="center">{props.status}</TableCell>
            <TableCell sx={{ backgroundColor: '#80cbc4'}}  align="center">{props.date}</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {props.tickets.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              hover role="checkbox" tabIndex={-1} key={row.code}
            >
              <TableCell align="center" component="th" scope="row">
                <Link to={`/projects/${project_id}/tickets/${row.id}`}>
                  {row.name}
                </Link>
                {/* {row.name} */}
              </TableCell>
              <TableCell align="center">{row.priority}</TableCell>
              <TableCell align="center">{row.description}</TableCell>
              <TableCell align="center">{row.status}</TableCell>
              <TableCell align="center">{row.date_created.replace(/\.[0-9]{3}/, '').replace('T', '').replace('Z', '')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
