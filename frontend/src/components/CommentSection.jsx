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
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
// import DeleteComment from "./DeleteComment";

export default function CommentSection(props) {
  let { project_id, ticket_id } = useParams();
  // const comments = useCommentsData(project_id, ticket_id);

  const avatarStyle = {
    display: "flex",
    backgroundColor: "#00675b",
    justifyContent: "center",
    alignItems: "center",
  };

  // if (props.comments.length === 0) return "No Comments";
  console.log("props.comments", props.comments);
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card elevation={4} sx={{ mt: 3, mb: 10, display: "block", width: 1000 }}>
        <CardContent>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Box
              sx={{
                flexGrow: 1,
                ml: 5,
                mr: 5,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <List elevation={4} sx={{ bgcolor: "background.paper" }}>
                {props.comments.map((row) => (
                  <>
                    <ListItem key={row.id} id={row.id} alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: "#80cbc4" }}>
                          {row.username.charAt(0)}
                        </Avatar>
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
                    <Divider variant="middle" component="li" />
                  </>
                ))}
              </List>
            </Box>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
