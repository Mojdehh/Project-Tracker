import { useState, useEffect } from "react";
import axios from "axios";

export default function useTicketDetails(project_id, ticket_id) {
  const [tickets, setTickets] = useState([]);
  console.log(project_id, ticket_id);
  useEffect(() => {
    axios
      .get(
        `http://localhost:8080/api/projects/${project_id}/tickets/${ticket_id}`
      )
      .then((details) => {
        console.log(details.data);
        setTickets(...tickets, details.data);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log("tickets->", tickets);
  return tickets;
}
