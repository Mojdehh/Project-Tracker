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
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  components: {
    
    TableHead: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          backgroundColor: '#00867d',
        },
      },
    },
  },
});



export default function BasicTable(props) {
  const pageLoad = useApplicationData();
  function refresh() {
    return pageLoad;
  }
  

  return (
    
  //   <Box
  //   sx={{
  //     display: "flex",
  //     justifyContent: "center",
  //     flexDirection: "row",

  //     // flexWrap: 'wrap',
  //     "& > :not(style)": {
  //       mt: 3,
        
  //       width: 1000,
  //       height: 450,
  //     },
  //   }}
  // >
  <ThemeProvider theme={theme}>
    <Paper display="flex" elevation={4} justifyContent="center" sx={{ mt: 3}} >
    <TableContainer style={{ maxHeight: 430 }} component={Paper}>
      <h1>{props.counter}</h1>
      <Table stickyHeader sx={{ minWidth: 500 }} aria-label="simple table">
        <TableHead  >
          <TableRow >
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
          {props.state.map((row) => (
            <TableRow
              key={row.name}
              
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center" component="th" scope="row">
                <Link to={`/projects/${row.id}`}>{row.name}</Link>
              </TableCell>
              <TableCell align="center">{row.number_of_tickets}</TableCell>
              <TableCell align="center">{row.status}</TableCell>
              <TableCell align="center">{row.date_created.replace(/\.[0-9]{3}/, '').replace('T', '').replace('Z', '')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Paper>
  </ThemeProvider>
    // </Box>
  );
}
