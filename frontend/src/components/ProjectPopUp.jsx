import * as React from "react";
import PropTypes from "prop-types";
import TextInput from "./TextInput";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { createTheme, ThemeProvider } from '@mui/material/styles';

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

const theme = createTheme({
  palette: {
    primary: {
      main: '#00675b',
    },
    secondary: {
      main: '#00675b',
    },
    typography: {
      fontFamily: [
        '"Anton"',
      ].join(','),
    },
  },
});

export default function CustomizedDialogs(props) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [users, setUsers] = React.useState([]);
  const [state, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const [error, setError] = React.useState("");
  const [errorNoDevs, setErrorNoDevs] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setValue("");
    setUsers([]);
    setError("");
    setErrorNoDevs("");
    setOpen(false);
  };

  function validate(value, users) {

    if (value === "") {
      setError("Please Enter Project Name");
      return;
    }
    if (users.length === 0) {
      setError("");
      setErrorNoDevs("Please Assign Developers");
      return;
    }
    setError("");
    setErrorNoDevs("");
    handleClick(value);
    handleClose();
  }

  const handleClick = (value) => {
    props.addProject(value);
    setValue("");
    setUsers([]);
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
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
              error={error}
              errorNoDevs={errorNoDevs}
            />
          </DialogContent>
          <DialogActions>
            <Button
              autoFocus
              onClick={(event) => {
                validate(value, users);
              }}
            >
              {props.add}
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </div>
    </ThemeProvider>
  );
}