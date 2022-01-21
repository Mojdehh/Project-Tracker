import * as React from "react";
import TicketsList from "./TicketsList";
import CommentPopUp from "./CommentPopup";
import CommentSection from "./CommentSection";
import BreadCrumbs from "./BreadCrumbs";
import useTicketDetails from "../hooks/useTicketDetails";
import useCommentsData from "../hooks/useCommentsData";
import { useParams } from "react-router";
import axios from "axios";

export default function TicketPage() {
  let { project_id, ticket_id } = useParams();
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
        console.log("response project pg", response.data);
        setTicket(response.data);
      })
      .catch((err) => console.log(err));
  }

  const handleSaveChanges = () => editTicket();
  return (
    <>
      <BreadCrumbs projectName={"Project Name"} ticket={"Ticket Name"} />
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
      <CommentPopUp
        ticket={ticket}
        setTicket={setTicket}
        comments={comments}
        setComments={setComments}
      />
      <CommentSection
        ticket={ticket}
        setTicket={setTicket}
        comments={comments}
        setComments={setComments}
      />
    </>
  );
}
