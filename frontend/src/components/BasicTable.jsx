import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, tickets, users, status, date) {
  return { name, tickets, users, status, date };
}

const rows = [
  createData('Tweeter', 5, 6, 24, 2022),
  createData('Tiny App', 8, 9, 37, 2021),
  createData('Jungle', 7, 16, 24, 2021),
  createData('Scheduler', 2, 3, 67, 2020),
  createData('Quiz App', 6, 16, 49, 2021),
];

export default function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Project Name</TableCell>
            <TableCell align="right">Number of Tickets</TableCell>
            <TableCell align="right">Number of Developers</TableCell>
            <TableCell align="right">Project Status</TableCell>
            <TableCell align="right">Date Created</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.tickets}</TableCell>
              <TableCell align="right">{row.users}</TableCell>
              <TableCell align="right">{row.status}</TableCell>
              <TableCell align="right">{row.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
