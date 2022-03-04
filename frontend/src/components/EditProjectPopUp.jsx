import * as React from "react";
import PropTypes from "prop-types";
import RadioBtn from "./RadioBtn";
import EditDropDown from "./EditDropDown";
import CircularUnderLoad from "./CircularUnderLoad";
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

export default function CustomizedDialogs(props) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(props.title);
  const [users, setUsers] = React.useState(props.arrOfDevs);
  const [state, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  if (props.projects.length === 0) return <CircularUnderLoad />;

  const handleClickOpen = () => {
    props.setResetName(props.projectName);
    setOpen(true);
  };

  const handleClose = (event) => {
    event.preventDefault();
    props.setProjectName(props.resetName);
    setUsers(props.arrOfDevs);
    props.setUserId(getIds(props.arrOfDevs));
    setOpen(false);
  };

  const statusArr = ["Open", "Closed"];
  const findIdByUserName = (name) => {
    const user = props.names.find((id) => id.full_name === name);
    return user.id;
  };

  const getIds = (arr) => {
    const idArr = [];
    for (let item of arr) {
      if (!idArr.includes(item)) {
        idArr.push(findIdByUserName(item));
      }
    }
    return idArr;
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
            Edit Project
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
                  id="project_name"
                  label={"Edit Project Name"}
                  multiline
                  value={props.projectName}
                  onChange={(event) => {
                    props.setProjectName(event.target.value);
                  }}
                />
                <br />
                <EditDropDown
                  devs={props.devs}
                  users={users}
                  setUsers={setUsers}
                  arrOfDevs={props.arrOfDevs}
                  userId={props.userId}
                  setUserId={props.setUserId}
                  names={props.names}
                  setNames={props.setNames}
                />
                <RadioBtn
                  statusArr={statusArr}
                  status={props.status}
                  setStatus={props.setStatus}
                  projects={props.projects}
                />
              </div>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              autoFocus
              onClick={(event) => {
                const ids = getIds(users);
                props.handleSaveChanges(
                  props.projectName,
                  event,
                  props.status,
                  ids
                );
                setOpen(false);
              }}
            >
              Save Changes
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </div>
    </ThemeProvider>

  );
}
