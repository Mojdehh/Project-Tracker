import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function RadioBtn() {
  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Priority</FormLabel>
      <RadioGroup
        sx={{
          display: "flex",
          textAlign: "center",
        }}
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel value="Low" control={<Radio />} label="Low" />
        <FormControlLabel value="Medium" control={<Radio />} label="Medium" />
        <FormControlLabel value="High" control={<Radio />} label="High" />
      </RadioGroup>
    </FormControl>
  );
}
