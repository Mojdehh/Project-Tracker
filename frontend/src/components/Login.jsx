import * as React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import TextField from "@mui/material/TextField";
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#004c40',
    },
    secondary: {
      main: '#00675b',
    },
    typography: {
      fontFamily: [
        '"Anton"',
      ].join(','),
    },
  },
});

export default function BasicCard() {
  const avatarStyle = { display: 'flex', backgroundColor: '#009688', justifyContent: 'center', alignItems: 'center' }
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = () => {
    login();
  }

  function login() {
    return axios
      .post(`http://localhost:8080/api/login`, {
        email, password
      })
      .then((response) => {
        window.location.href = '/'
      });
  }

  useEffect(() => {
    axios.get('http://localhost:8080/api/login')
      .then((response) => {
        if (response.data.loggedIn === true) {
          const username = response.data.user.full_name
          window.location.href = '/'
        }
      })
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Grid>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Card elevation={4} sx={{ mt: 8, mb: 2, display: 'block', width: '30vw' }}>
            <CardContent>
              <Typography variant="h5" component="div" sx={{ color: "#004d40", mt: 3, fontWeight: 'bold' }}>
                Login
              </Typography>
              <CardActions style={{ justifyContent: 'center' }}>
                <Avatar sx={{ mb: 6, height: 50, width: 50 }} style={avatarStyle}><LockOutlinedIcon /></Avatar>
              </CardActions>
              <TextField
                id="Username"
                name="email"
                label="Username"
                placeholder="Enter Username"
                value={email}
                onChange={(event) => { setEmail(event.target.value) }}
              />
              <br />
              <br />
              <TextField
                id="Password"
                name="password"
                label="Password"
                placeholder="Enter Password"
                type="password"
                value={password}
                onChange={(event) => { setPassword(event.target.value) }}
              />
              <CardActions style={{ justifyContent: 'center' }}>
                <Button onClick={handleClick} size="large" variant="contained" >Login</Button>
              </CardActions>
              <Typography sx={{ mt: 3 }}>
                <Link to="#" style={{ color: "#004d40" }} >
                  Forgot Username/Password?
                </Link>
              </Typography>
              <Typography>
                <Link to="#" style={{ color: "#004d40" }}>
                  Sign Up
                </Link>
              </Typography>
            </CardContent>
          </Card>
        </div>
      </Grid>
    </ThemeProvider>
  );
}