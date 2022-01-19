import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import useTicketDetails from "../hooks/useTicketDetails";
import { useParams } from "react-router-dom";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function TicketsList(props) {
  const [dense, setDense] = React.useState(true);
  const [secondary, setSecondary] = React.useState(false);
  let { project_id, ticket_id } = useParams();
  console.log(ticket_id);
  // const ticket = useTicketDetails(project_id, ticket_id);
  //console.log("ticketlistticket", ticket);
  if (props.ticket.length === 0) return "loading";
  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
      <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
        {props.ticket[0].name}
      </Typography>
      <Demo>
        <List dense={dense}>
          <ListItem>
            <ListItemText
              primary="Description"
              secondary={props.ticket[0].description}
            />
          </ListItem>
          <ListItem>
            <ListItemText primary="Status" secondary={props.ticket[0].status} />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Priority"
              secondary={props.ticket[0].priority}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Date Created"
              secondary={props.ticket[0].date_created}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Developer"
              secondary={props.ticket[0].username}
            />
          </ListItem>
        </List>
      </Demo>
    </Box>
  );
}
