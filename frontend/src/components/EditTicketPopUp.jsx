import * as React from "react";
import PropTypes from "prop-types";
import RadioBtn from "./RadioBtn";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { createTheme, ThemeProvider } from "@mui/material/styles";

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

const theme = createTheme({
  palette: {
    primary: {
      main: "#00675b",
    },
    secondary: {
      main: "#00675b",
    },
  },
});

export default function CustomizedDialogs(props) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    props.setResetTicketState({
      name: props.ticketState.name,
      description: props.ticketState.description,
      status: props.ticketState.status,
      priority: props.ticketState.priority,
    });
    setOpen(true);
  };
  const handleClose = (event) => {
    event.preventDefault();
    props.setTicketState({
      name: props.resetTicketState.name,
      description: props.resetTicketState.description,
      status: props.resetTicketState.status,
      priority: props.resetTicketState.priority,
    });
    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Button variant="contained" onClick={handleClickOpen}>
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
                <TextField
                  required
                  id="ticketName"
                  label={"Ticket Name"}
                  value={props.ticketState.name}
                  onChange={(event) => {
                    props.setTicketState({ name: event.target.value });
                  }}
                />
                <br />
                <TextField
                  required
                  id="ticketDescription"
                  label={"Ticket Description"}
                  helperText="Enter Ticket Description"
                  value={props.ticketState.description}
                  onChange={(event) => {
                    props.setTicketState({ description: event.target.value });
                  }}
                />
              </div>
              <div>
                <br />
                <RadioBtn
                  resetTicketState={props.resetTicketState}
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
    </ThemeProvider>
  );
}