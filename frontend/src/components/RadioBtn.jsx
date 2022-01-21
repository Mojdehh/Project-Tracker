import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function RadioBtn(props) {
  return (
    <FormControl>
      {props.statusArr && (
        <>
          <FormLabel id="demo-row-radio-buttons-group-label">Status</FormLabel>
          <RadioGroup
            sx={{
              display: "flex",
              textAlign: "center",
            }}
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel
              value="Open"
              control={<Radio />}
              label={props.projects[0].status === "Closed" ? "Re-Open" : "Open"}
              onChange={(event) => {
                props.setStatus(event.target.value);
              }}
            />
            <FormControlLabel
              value="Closed"
              control={<Radio />}
              label="Closed"
              onChange={(event) => {
                props.setStatus(event.target.value);
              }}
            />
          </RadioGroup>
        </>
      )}
      {props.priority && (
        <>
          <FormLabel id="demo-row-radio-buttons-group-label">
            Priority
          </FormLabel>
          <RadioGroup
            sx={{
              display: "flex",
              textAlign: "center",
            }}
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel
              value="Low"
              control={<Radio />}
              label="Low"
              onChange={(event) => {
                props.setTicketState({ priority: event.target.value });
              }}
            />
            <FormControlLabel
              value="Medium"
              control={<Radio />}
              label="Medium"
              onChange={(event) => {
                props.setTicketState({ priority: event.target.value });
              }}
            />
            <FormControlLabel
              value="High"
              control={<Radio />}
              label="High"
              onChange={(event) => {
                props.setTicketState({ priority: event.target.value });
              }}
            />
          </RadioGroup>
        </>
      )}
      {props.ticketStatus && (
        <>
          <br />
          <FormLabel id="demo-row-radio-buttons-group-label">Status</FormLabel>
          <RadioGroup
            sx={{
              display: "flex",
              textAlign: "center",
            }}
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel
              value="Open"
              control={<Radio />}
              label="Open"
              onChange={(event) => {
                props.setTicketState({ status: event.target.value });
              }}
            />
            <FormControlLabel
              value="Pending"
              control={<Radio />}
              label="Pending"
              onChange={(event) => {
                props.setTicketState({ status: event.target.value });
              }}
            />
            <FormControlLabel
              value="Resolved"
              control={<Radio />}
              label="Resolved"
              onChange={(event) => {
                props.setTicketState({ status: event.target.value });
              }}
            />
          </RadioGroup>
        </>
      )}
    </FormControl>
  );
}
