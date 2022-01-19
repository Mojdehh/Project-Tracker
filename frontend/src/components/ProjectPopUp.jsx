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
import TextInput from "./TextInput";
import useProjectsData from "../hooks/useProjectsData";
import useApplicationData from "../hooks/useApplicationData";

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
  const [value, setValue] = React.useState("");
  const [users, setUsers] = React.useState([]);
  const [state, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // const { addProject, refresh } = useApplicationData();
  // const handleClick = (value, event) => {
  //   event.preventDefault();
  //   addProject(value);
  //   handleClose();
  //   // props.setList(value);
  //   // forceUpdate();
  //   props.setCounter(props.counter + 1);
  // };

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
          Add Project
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <TextInput
            name="Project Name"
            title="Add Developers"
            value={value}
            setValue={setValue}
            users={users}
            setUsers={setUsers}
            userId={props.userId}
            setUserId={props.setUserId}
          />
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={(event) => {
              props.handleClick(value, props.userId, event);
              handleClose();
            }}
          >
            {props.add}
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
