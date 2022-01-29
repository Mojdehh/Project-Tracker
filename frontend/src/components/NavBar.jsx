import * as React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Toolbar from "@mui/material/Toolbar";
import CodeIcon from "@mui/icons-material/Code";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#009688",
    },
    secondary: {
      main: "#004c40",
    },
    typography: {
      fontFamily: ['"Anton"'].join(","),
    },
  },
});

export default function ButtonAppBar() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8080/api/login").then((response) => {
      if (response.data.loggedIn === true) {
        setUsername(response.data.user.full_name);
      }
    });
  }, []);

  const handleLogoutClick = () => {
    axios.post("http://localhost:8080/api/logout").then(() => {
      {
        window.location.href = "/login";
      }
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar className="NavBar" position="static">
          <Toolbar>
            <Link style={{ textDecoration: "none", color: "white" }} to={`/`}>
              <IconButton
                size="medium"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2, fontFamily: "Anton" }}
              >
                <CodeIcon sx={{ mr: 2, color: "#424242", fontSize: 40 }} />
                Project Tracker
              </IconButton>
            </Link>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            ></Typography>

            {
              username !== "" ? (
                <>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: "#80cbc4" }}>
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
              ) : null
            }
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}