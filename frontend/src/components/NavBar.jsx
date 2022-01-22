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
import Avatar from "@mui/material/Avatar";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

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

    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="medium"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <DeveloperModeIcon sx={{ fontSize: 40 }} /> Project Tracker
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>

          {username !== "" ? (
            <>
            <ListItemAvatar>
                <Avatar alt={username} src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
              <Button 
                variant="contained" 
                color="success" 
                onClick={() => handleLogoutClick()}
                >
                Logout
              </Button>
            </>
          ) : (
            <Button 
              variant="contained" 
              color="success" 
              onClick={() => {window.location.href = '/login'}}
              >
              Login
            </Button>
          )}


        </Toolbar>
      </AppBar>
    </Box>
  );
}
