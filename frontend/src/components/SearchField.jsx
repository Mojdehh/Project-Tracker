import * as React from 'react';
import { useRef } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function SearchField(props) {
  const inputE1 = useRef("");

  const searchHandler = () => {
    props.setSearchTerm(inputE1.current.value);
    if (inputE1.current.value) {
      const filteredResult = props.state.filter((project) => {
        return Object.values(project)
          .join(" ")
          .toLowerCase()
          .includes(props.searchTerm.toLowerCase());
      });
      props.setProjects(filteredResult);
    } else {
      props.setProjects(props.state);
    }
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: '#009688',
      },
      secondary: {
        main: '#004c40',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '50ch' }, color: 'inherit'
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="input-with-sx"
          label={props.label}
          variant="outlined"
          inputRef={inputE1}
          value={props.searchTerm}
          onChange={searchHandler}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </ThemeProvider>
  );
}