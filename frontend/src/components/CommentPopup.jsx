import * as React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
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
  const [comment, setComment] = React.useState("");
  const [error, setError] = React.useState("");
  let { project_id, ticket_id } = useParams();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setComment("");
    setError("");
    setOpen(false);
  };

  const handleClose = (event) => {
    event.preventDefault();
    addComment();
    setComment("");
    setOpen(false);
  };

  function validate(event) {
    if (comment === "") {
      setError("Please Enter A Comment");
      return;
    }
    setError("");
    handleClose(event);
  }

  function addComment() {
    return axios
      .post(
        `http://localhost:8080/api/projects/${project_id}/tickets/${ticket_id}/comments`,
        {
          comment: comment,
        }
      )
      .then((response) => {
        axios
          .get(
            `http://localhost:8080/api/projects/${project_id}/tickets/${ticket_id}/comments`
          )
          .then((response) => {
            console.log("response", response);
            props.setComments(response.data);
          });
      })
      .catch((err) => console.log(err));
  }

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Button size="medium" variant="contained" onClick={handleClickOpen}>
          Add a comment
        </Button>
        <BootstrapDialog
          onClose={handleClickClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={handleClickClose}
          >
            Post Comment
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
                  label="Comment"
                  placeholder="Type a comment"
                  multiline
                  value={comment}
                  onChange={(event) => {
                    setComment(event.target.value);
                  }}
                />
                <section
                  style={{
                    marginLeft: "15px",
                    color: "red",
                  }}
                >
                  {error}
                </section>
                <br />
              </div>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={validate}>
              Submit comment
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </div>
    </ThemeProvider>
  );
}