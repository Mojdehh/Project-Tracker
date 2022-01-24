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
import RadioBtn from "./RadioBtn";
import CircularUnderLoad from "./CircularUnderLoad";
import axios from "axios";
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

  console.log("users", users);

  if (props.projects.length === 0) return <CircularUnderLoad />;

  const handleClickOpen = () => {
    //props.setProjectName(props.projectName);
    //props.setUserId();
    props.setResetName(props.projectName);
    setOpen(true);
  };
  // console.log("props.resetName---", props.resetName);

  const handleClose = (event) => {
    event.preventDefault();
    props.setProjectName(props.resetName);
    setUsers(props.arrOfDevs);
    props.setUserId(getIds(props.arrOfDevs));
    setOpen(false);
  };

  //console.log("on close ids", getIds(users));
  const statusArr = ["Open", "Closed"];
  const findIdByUserName = (name) => {
    console.log("names pop up", props.names);
    console.log("name pop up", name);
    const user = props.names.find((id) => id.full_name === name);
    //console.log(user);
    return user.id;
  };
  // const findIdByUserName = (name) => {
  //   console.log("names", props.names);
  //   console.log("before user", name);
  //   const user = props.names.find((id) => {
  //     console.log("object name", id.full_name);
  //     console.log("after user", name);
  //   });
  //   console.log(user);
  //   //return user.id;
  // };

  const getIds = (arr) => {
    const idArr = [];
    console.log("arr", arr);
    for (let item of arr) {
      console.log("item", item);
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
                value={props.projectName}
                onChange={(event) => {
                  props.setProjectName(event.target.value);
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
              console.log("on save ids", ids);
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
