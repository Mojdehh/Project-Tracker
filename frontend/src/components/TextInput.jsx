import * as React from "react";
import UsersDropDown from "./UsersDropDown";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function TextInput(props) {

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
          multiline
          value={props.value}
          onChange={(event) => {
            props.setValue(event.target.value);
          }}
        />
        <section
          style={{
            marginLeft: "15px",
            color: "red",
          }}
        >
          {props.error}
        </section>
        <br />
        <UsersDropDown
          title="Add developers"
          users={props.users}
          setUsers={props.setUsers}
          userId={props.userId}
          setUserId={props.setUserId}
          errorNoDevs={props.errorNoDevs}
        />
      </div>
    </Box>
  );
}