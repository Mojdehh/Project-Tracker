import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import CommentIcon from "@mui/icons-material/Comment";
import Grid from "@mui/material/Grid";
import CommentPopUp from "./CommentPopup";
// import DeleteComment from "./DeleteComment";

export default function CommentSection(props) {
  let { project_id, ticket_id } = useParams();
  // const comments = useCommentsData(project_id, ticket_id);

  const avatarStyle = {
    display: "flex",
    backgroundColor: "#4caf50",
    justifyContent: "center",
    alignItems: "center",
  };

  // if (props.comments.length === 0) return "No Comments";
  console.log("props.comments", props.comments);
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {props.comments.length === 0 ? (
        <Grid container direction="row" alignItems="center">
          <Grid item>
            <Avatar sx={{ ml: 2, mb: 4 }} style={avatarStyle}>
              <CommentIcon />
            </Avatar>
          </Grid>
          <Grid item>
            <Typography sx={{ mt: 2, mb: 2, ml: 1 }} variant="h6">
              Comments
              <Grid item>
                <CommentPopUp
                  ticket={props.ticket}
                  setTicket={props.setTicket}
                  comments={props.comments}
                  setComments={props.setComments}
                />
              </Grid>
            </Typography>
          </Grid>
        </Grid>
      ) : (
        <Grid container direction="row" alignItems="center">
          <Grid item>
            <Avatar sx={{ ml: 2, mb: 4 }} style={avatarStyle}>
              <CommentIcon />
            </Avatar>
          </Grid>
          <Grid item>
            <Typography sx={{ mt: 2, mb: 2, ml: 1 }} variant="h6">
              Comments
              <Grid item>
                <CommentPopUp
                  ticket={props.ticket}
                  setTicket={props.setTicket}
                  comments={props.comments}
                  setComments={props.setComments}
                />
              </Grid>
            </Typography>
          </Grid>
        </Grid>
      )}

      {props.comments.map((row) => (
        <>
          <ListItem key={row.id} id={row.id} alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt={row.username} src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary={row.note}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {row.username}
                  </Typography>
                  <br />
                  {row.date_created
                    .replace(/\.[0-9]{3}/, "")
                    .replace("T", "")
                    .replace("Z", "")}
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </>
      ))}
    </List>
  );
}
