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
      <BreadCrumbs
        projectName={projectName}
        ticketName={ticketState.name}
        project_id={project_id}
      />
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
      <br />
      <br />
      <CommentSection
        ticket={ticket}
        setTicket={setTicket}
        comments={comments}
        setComments={setComments}
      />
    </>
  );
}
