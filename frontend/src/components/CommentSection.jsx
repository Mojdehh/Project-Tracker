import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";

export default function CommentSection(props) {
  let { project_id, ticket_id } = useParams();
  // const comments = useCommentsData(project_id, ticket_id);

  if (props.comments.length === 0) return "No Comments";
  console.log("props.comments", props.comments);
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {props.comments.map((row) => (
        <>
          <ListItem key={row.id} alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt={row.username} src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary={row.username}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {row.date_created}
                  </Typography>
                  <br />
                  {row.note}
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
