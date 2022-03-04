import * as React from "react";
import { useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { formatDateTime } from "../Helper/dateHelperFuncs.ts"
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import EditTicketPopUp from "./EditTicketPopUp";
import Typography from "@mui/material/Typography";
import CircularUnderLoad from "./CircularUnderLoad";
import CardContent from "@mui/material/CardContent";
import ListItemText from "@mui/material/ListItemText";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function TicketsList(props) {
  const [dense, setDense] = React.useState(true);
  const [secondary, setSecondary] = React.useState(false);
  let { project_id, ticket_id } = useParams();

  if (props.ticket.length === 0) return <CircularUnderLoad />;
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "row",
        "& > :not(style)": {
          m: 1,
          pt: 2,
          pb: 2,
          mt: 2,
          width: 1000,
          height: 230,
        },
      }}
    >
      <Card
        elevation={4}
        sx={{ mt: 1, mb: 2, display: "block", width: "60vw" }}
      >
        <CardContent>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Box
              sx={{
                flexGrow: 1,
                maxWidth: 1000,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography sx={{ mt: 1, mb: 1 }} variant="h6" component="div">
                Ticket: {props.ticket[0].name}
              </Typography>
              <Typography>Details: {props.ticket[0].description}</Typography>
              <Demo>
                <List
                  sx={{ display: "flex", flexDirection: "row" }}
                  dense={dense}
                >
                  <ListItem>
                    <ListItemText
                      primary="Status"
                      primaryTypographyProps={{
                        display: "flex",
                        textalign: "center",
                        justifyContent: "center",
                      }}
                      secondary={props.ticket[0].status}
                      secondaryTypographyProps={{
                        display: "flex",
                        textalign: "center",
                        justifyContent: "center",
                      }}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Priority"
                      primaryTypographyProps={{
                        display: "flex",
                        textalign: "center",
                        justifyContent: "center",
                      }}
                      secondary={props.ticket[0].priority}
                      secondaryTypographyProps={{
                        display: "flex",
                        textalign: "center",
                        justifyContent: "center",
                      }}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Date Created"
                      primaryTypographyProps={{
                        display: "flex",
                        textalign: "center",
                        justifyContent: "center",
                      }}
                      secondary={formatDateTime(props.ticket[0].date_created)}
                      secondaryTypographyProps={{
                        display: "flex",
                        textalign: "center",
                        justifyContent: "center",
                      }}
                    />
                  </ListItem>
                  {props.ticket[0].date_updated && (
                    <ListItem>
                      <ListItemText
                        primary="Date Updated"
                        primaryTypographyProps={{
                          display: "flex",
                          textalign: "center",
                          justifyContent: "center",
                        }}
                        secondary={formatDateTime(props.ticket[0].date_updated)}
                        secondaryTypographyProps={{
                          display: "flex",
                          textalign: "center",
                          justifyContent: "center",
                        }}
                      />
                    </ListItem>
                  )}
                  <ListItem>
                    <ListItemText
                      primary="Last Updated By"
                      primaryTypographyProps={{
                        display: "flex",
                        textalign: "center",
                        justifyContent: "center",
                      }}
                      secondary={props.ticket[0].username}
                      secondaryTypographyProps={{
                        display: "flex",
                        textalign: "center",
                        justifyContent: "center",
                      }}
                    />
                  </ListItem>
                </List>
              </Demo>
            </Box>
          </div>
          <EditTicketPopUp
            ticket={props.ticket}
            setTicket={props.setTicket}
            ticketState={props.ticketState}
            setTicketState={props.setTicketState}
            resetTicketState={props.resetTicketState}
            setResetTicketState={props.setResetTicketState}
            priority={props.priority}
            setPriority={props.setPriority}
            handleSaveChanges={props.handleSaveChanges}
          />
        </CardContent>
      </Card>
    </Box>
  );
}