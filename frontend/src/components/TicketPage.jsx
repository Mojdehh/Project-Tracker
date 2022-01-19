import * as React from "react";
import TicketsList from "./TicketsList";
import CommentPopUp from "./CommentPopup";
import CommentSection from "./CommentSection";
import BreadCrumbs from "./BreadCrumbs";
import useTicketDetails from "../hooks/useTicketDetails";
import useCommentsData from "../hooks/useCommentsData";
import { useParams } from "react-router";

export default function TicketPage() {
  let { project_id, ticket_id } = useParams();

  const { ticket, setTicket } = useTicketDetails(project_id, ticket_id);
  const { comments, setComments } = useCommentsData(project_id, ticket_id);

  return (
    <>
      <BreadCrumbs projectName={"Project Name"} ticket={"Ticket Name"} />
      <TicketsList ticket={ticket} setTicket={setTicket} />
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
