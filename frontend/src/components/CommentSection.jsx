import * as React from "react";
import { useParams } from "react-router-dom";
import { formatTimeAgo } from "../Helper/dateHelperFuncs.ts";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";

export default function CommentSection(props) {
  let { project_id, ticket_id } = useParams();

  const avatarStyle = {
    display: "flex",
    backgroundColor: "#00675b",
    justifyContent: "center",
    alignItems: "center",
  };

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
                  <React.Fragment key={row.id}>
                    <ListItem id={row.id} alignItems="flex-start">
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
                            >
                              {row.username}
                            </Typography>
                            <br />
                            {formatTimeAgo(row.date_created)
                            } ago
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                    <Divider variant="middle" component="li" />
                  </React.Fragment>
                ))}
              </List>
            </Box>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}