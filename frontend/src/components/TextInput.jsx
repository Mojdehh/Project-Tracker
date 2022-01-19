import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import UsersDropDown from "./UsersDropDown";

export default function TextInput(props) {
  // const handleChange = (event) => {
  //   setValue(event.target.value)
  // };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "50ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="project_name"
          label={props.name}
          // placeholder={props.name}
          multiline
          value={props.value}
          onChange={(event) => {
            props.setValue(event.target.value);
          }}
        />
        <br />
        <UsersDropDown
          title="Add developers"
          users={props.users}
          setUsers={props.setUsers}
          userId={props.userId}
          setUserId={props.setUserId}
        />
      </div>
    </Box>
  );
}
