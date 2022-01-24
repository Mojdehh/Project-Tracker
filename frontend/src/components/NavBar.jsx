import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import DeveloperModeIcon from '@mui/icons-material/DeveloperMode';
import ListItemAvatar from "@mui/material/ListItemAvatar";
import PestControlOutlinedIcon from '@mui/icons-material/PestControlOutlined';
import Avatar from "@mui/material/Avatar";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import NextWeekOutlinedIcon from '@mui/icons-material/NextWeekOutlined';
import CodeOffOutlinedIcon from '@mui/icons-material/CodeOffOutlined';


const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: '#009688',
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#004c40',
    },
    typography: {
      fontFamily: [
        '"Anton"',
      ].join(','),
    },
  },
});

export default function ButtonAppBar() {
  
  const [username, setUsername] = useState("")

  useEffect(() => {
    axios.get('http://localhost:8080/api/login')
      .then((response) => {
        if (response.data.loggedIn === true) {
          setUsername(response.data.user.full_name)
        }
      })
  }, [])

  const handleLogoutClick = () => {
    // useEffect(() => {
      axios.post('http://localhost:8080/api/logout')
        .then(() => {
          {window.location.href = '/login'}
        })
  };


  return (
<ThemeProvider theme={theme}>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar className="NavBar" position="static">
        <Toolbar>
          <IconButton
            size="medium"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2,  fontFamily: 'Anton',  }}
          >
            <CodeOffOutlinedIcon sx={{ mr: 2, color: '#424242', fontSize: 40 }} /> 
            Project Tracker
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>

          {username !== "" ? (
            <>
            <ListItemAvatar>
                <Avatar  
                sx={{ bgcolor: "#80cbc4" }}
                >
                  {username.charAt(0)}
                </Avatar>
              </ListItemAvatar>
              <Button 
              color="secondary"
                variant="outlined" 
                 
                onClick={() => handleLogoutClick()}
                >
                Logout
              </Button>
            </>
          ) : (
            <Button 
              variant="outlined" 
              color="success" 
              onClick={() => {window.location.href = '/login'}}
              >
              Login
            </Button>
          )}


        </Toolbar>
      </AppBar>
    </Box>
    </ThemeProvider>
  );
}
