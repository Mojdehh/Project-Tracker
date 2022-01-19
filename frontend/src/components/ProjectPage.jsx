import * as React from "react";
import InteractiveList from "./InteractiveList";
import TicketsTable from "./TicketsTable";
import TicketPopUp from "./TicketPopUp";
import BreadCrumbs from "./BreadCrumbs";
import useTicketsData from "../hooks/useTicketsData";
import { useParams } from "react-router";



export default function ProjectPage() {
  let { project_id } = useParams();

  // const [ticketRow, setTicketRows] = React.useState([]);
  const { tickets, setTickets } = useTicketsData(project_id);

  // React.useEffect(() => {
  //   setTicketRows(state);
  // }, [ticketRow]);


  return (
    <>
      <BreadCrumbs project={"project name"} />
      <InteractiveList />
      <TicketPopUp name="Add a Ticket" add="Create new Ticket" tickets={tickets}
        setTickets={setTickets} />
      <TicketsTable
        name="Ticket Name"
        description="Description"
        priority="Priority"
        status="Status"
        date="Date Created"
        tickets={tickets}
        setTickets={setTickets}
      /> 

    </>
  )
}
