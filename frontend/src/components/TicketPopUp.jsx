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
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import RadioBtn from "./RadioBtn";
import { useParams } from "react-router-dom";
import axios from "axios";

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

export default function TicketPopUp() {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [priority, setPriority] = React.useState();
  const { project_id } = useParams();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    addTicket();
    setOpen(false);
  };

  function addTicket() {
    return axios
      .post(`http://localhost:8080/api/projects/${project_id}`, {
        ticketName: name,
        description: description,
        priority: priority,
        // userId: someValue
      })
      .then((response) => {
        //setTableRows(details.data);
        console.log(response);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add a Ticket
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
          Add Ticket
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
                id=""
                label="Ticket Name"
                placeholder="Ticket Name"
                multiline
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
              <br />
              <TextField
                id=""
                label="Ticket Description"
                placeholder="Ticket Description"
                multiline
                value={description}
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
              />
              <br />
              <RadioBtn priority={priority} setPriority={setPriority} />
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Create New Ticket
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
