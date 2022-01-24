import * as React from "react";
import TicketsList from "./TicketsList";
import CommentPopUp from "./CommentPopup";
import CommentSection from "./CommentSection";
import BreadCrumbs from "./BreadCrumbs";
import useTicketDetails from "../hooks/useTicketDetails";
import useProjectDetail from "../hooks/useProjectDetail";
import useCommentsData from "../hooks/useCommentsData";
import { useParams } from "react-router";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import CommentIcon from "@mui/icons-material/Comment";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";

export default function TicketPage(props) {
  let { project_id, ticket_id } = useParams();
  const { projectName } = useProjectDetail(project_id);
  const { ticket, setTicket, ticketState, setTicketState } = useTicketDetails(
    project_id,
    ticket_id
  );
  const handleReturn = (newState) => {
    setTicket((prev) => ({ ...prev, ...newState }));
  };
  const handleChangeTicket = (newState) => {
    setTicketState((prev) => ({ ...prev, ...newState }));
  };

  const { comments, setComments } = useCommentsData(project_id, ticket_id);
  const [resetTicketState, setResetTicketState] = React.useState({});
  //const [priority, setPriority] = React.useState("");
  //const [ticketStatus, setTicketStatus] = React.useState();
  console.log("ticketPagePriority", ticketState.priority);
  console.log("ticketPageStatus", ticketState.status);
  console.log("ticketPageName", ticketState.name);
  console.log("ticketPageDescription", ticketState.description);

  const avatarStyle = {
    display: "flex",
    backgroundColor: "#00675b",
    justifyContent: "center",
    alignItems: "center",
  };
  function editTicket() {
    return axios
      .put(
        `http://localhost:8080/api/projects/${project_id}/tickets/${ticket_id}`,
        {
          priority: ticketState.priority,
          status: ticketState.status,
          name: ticketState.name,
          description: ticketState.description,
        }
      )
      .then((response) => {
        // console.log("response project pg", response.data);
        // setTicket(response.data);
        axios
          .get(
            `http://localhost:8080/api/projects/${project_id}/tickets/${ticket_id}`
          )
          .then((details) => {
            console.log(details.data);
            setTicket(details.data);
          })
          .catch((err) => console.log(err));
      });
  }

  console.log("@!!!", ticket);
  const handleSaveChanges = () => editTicket();
  return (
    <>
      <div>
        <BreadCrumbs
          projectName={projectName}
          ticketName={ticketState.name}
          project_id={project_id}
        />
        <div>
          <TicketsList
            ticket={ticket}
            setTicket={setTicket}
            ticketState={ticketState}
            setTicketState={handleChangeTicket}
            resetTicketState={resetTicketState}
            setResetTicketState={setResetTicketState}
            // priority={priority}
            // setPriority={setPriority}
            handleSaveChanges={handleSaveChanges}
          />
        </div>
      </div>

      <div>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",

            // flexWrap: 'wrap',
            "& > :not(style)": {
              mt: 3,
              pt: 2.5,
              width: 1000,
              height: 90,
            },
          }}
        >
          <Paper elevation={4}>
            <Grid
              container
              rowSpacing={10}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item sx={{ ml: 7 }}>
                <Grid container direction="row" alignItems="center">
                  <Grid item>
                    <Avatar sx={{ ml: 2 }} style={avatarStyle}>
                      <CommentIcon />
                    </Avatar>
                  </Grid>
                  <Grid item>
                    <Typography sx={{ mt: 2, mb: 2, ml: 1.5 }} variant="h6">
                      Comments
                    </Typography>
                  </Grid>
                  <Grid item sx={{ ml: 70 }}>
                    <CommentPopUp
                      setComments={setComments}
                      comments={comments}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <br />
            <br />
            {comments.length === 0 ? (
              <Chip sx={{ mt: 2 }} label="No Comments" />
            ) : (
              <CommentSection
                ticket={ticket}
                setTicket={setTicket}
                comments={comments}
                setComments={setComments}
              />
            )}
          </Paper>
        </Box>
      </div>
    </>
  );
}
