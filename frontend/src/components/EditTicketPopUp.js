import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import RadioBtn from "./RadioBtn";
import Input from "@mui/material/Input";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const ariaLabel = { "aria-label": "description" };

export default function CustomizedDialogs(props) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    props.setResetTicketState({
      name: props.ticketState.name,
      description: props.ticketState.description,
    });
    setOpen(true);
  };
  const handleClose = (event) => {
    event.preventDefault();
    props.setTicketState({
      name: props.resetTicketState.name,
      description: props.resetTicketState.description,
    });
    setOpen(false);
  };
  console.log("props.ticketState", props.ticketState);
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Edit Ticket
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Edit Ticket
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "50ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              {/* <Input
                placeholder="Edit Ticket Name"
                inputProps={ariaLabel}
                value={props.ticketState.name}
                onChange={(event) => {
                  props.setTicketState({ name: event.target.value });
                }}
              /> */}
              <TextField
                required
                id="ticketName"
                //label={"Ticket Name"}
                //placeholder="Edit Ticket Name"
                //multiline
                value={props.ticketState.name}
                onChange={(event) => {
                  props.setTicketState({ name: event.target.value });
                }}
              />
              <br />
              {/* <Input
                placeholder="Edit Description"
                inputProps={ariaLabel}
                value={props.ticketState.description}
                onChange={(event) => {
                  props.setTicketState({ description: event.target.value });
                }}
              /> */}
              <TextField
                required
                id="ticketDescription"
                //label={"Ticket Description"}
                //placeholder="Edit Ticket Description"
                //multiline
                value={props.ticketState.description}
                onChange={(event) => {
                  props.setTicketState({ description: event.target.value });
                }}
              />
            </div>
            <div>
              <br />
              <RadioBtn
                priority={"priority"}
                setPriority={props.setPriority}
                setTicketState={props.setTicketState}
                ticketState={props.ticketState}
              />
              <br />
              <RadioBtn
                ticketStatus={"priority"}
                ticketState={props.ticketState}
                setTicketState={props.setTicketState}
              />
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={(event) => {
              props.handleSaveChanges(
                props.ticketState.name,
                props.ticketState.description,
                props.ticketState.status,
                event,
                props.priority
              );
              setOpen(false);
            }}
          >
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}

// const ariaLabel = { 'aria-label': 'description' };

// export default function Inputs() {
//   return (
//     <Box
//       component="form"
//       sx={{
//         '& > :not(style)': { m: 1 },
//       }}
//       noValidate
//       autoComplete="off"
//     >
//       <Input defaultValue="Hello world" inputProps={ariaLabel} />
//       <Input placeholder="Placeholder" inputProps={ariaLabel} />
//       <Input disabled defaultValue="Disabled" inputProps={ariaLabel} />
//       <Input defaultValue="Error" error inputProps={ariaLabel} />
//     </Box>
//   );
// }
