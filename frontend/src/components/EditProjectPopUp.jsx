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
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import EditDropDown from "./EditDropDown";

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

export default function CustomizedDialogs(props) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(props.title);
  const [users, setUsers] = React.useState([props.devs]);
  const [state, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  console.log("users", users);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        {props.name}
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
          Edit Project
        </BootstrapDialogTitle>
        <DialogContent dividers>
          {/* <TextInput
            name="Edit Project Name"
            title="Add Developers"
            value={value}
            setValue={setValue}
            users={users}
            setUsers={setUsers}
            userId={props.userId}
            setUserId={props.setUserId}
          /> */}
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
                label={"Edit Project Name"}
                // placeholder={props.name}
                multiline
                value={props.title}
                onChange={(event) => {
                  props.setValue(event.target.value);
                }}
              />
              <br />
              {/* <UsersDropDown
                title="Add developers"
                users={props.users}
                setUsers={props.setUsers}
                userId={props.userId}
                setUserId={props.setUserId}
              /> */}
              <EditDropDown devs={props.devs} />
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={(event) => {
              props.handleClick(value, props.userId, event);
              handleClose();
            }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
