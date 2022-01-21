import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from "@mui/material/TextField";
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useState } from 'react';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);


export default function BasicCard() {
  const avatarStyle = { display: 'flex', backgroundColor: '#4caf50', justifyContent: 'center', alignItems: 'center' }
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
      window.location.href = '/'});

  }

 
  
  return (
    <Grid >
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Card elevation={4} sx={{ mt: 6, mb: 2, display: 'block', width: '30vw' }}>
          <CardContent>
          <Typography variant="h5" component="div" sx={{fontWeight: 'bold'}}>
              Login
            </Typography>
          <CardActions style={{ justifyContent: 'center' }}>
              <Avatar style={avatarStyle}><LockOpenIcon /></Avatar>
            </CardActions>
            <br />

            <TextField
              id="Username"
              name="email"
              label="Username"
              placeholder="Enter Username"
              value={email}
              onChange={(event)=> {setEmail(event.target.value)}}
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
              onChange={(event)=> {setPassword(event.target.value)}}
            />
            
            <br />
            <br />
            <Typography>
            <Link to="#" >
              Forgot Password?
              </Link>
            </Typography>
            <Typography>
            <Link to="#" >
              Register
              </Link>
            </Typography>
          </CardContent>
          <CardActions style={{ justifyContent: 'center' }}>

            {/* <form action = "/login"  method = "POST"> */}

            <Button onClick={handleClick} size="small" variant="contained" >Login</Button>
            {/* </form> */}

          </CardActions>
        </Card>
      </div>
    </Grid>
  );
}
