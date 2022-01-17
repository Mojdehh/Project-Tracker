import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import UsersDropDown from "./UsersDropDown";

export default function TextInput(props) {
  const [value, setValue] = React.useState("Controlled");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

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
          id="outlined-textarea"
          label={props.name}
          // placeholder={props.name}
          multiline
        />
        <br />
        <UsersDropDown title="Add developers" />
      </div>
    </Box>
  );
}
