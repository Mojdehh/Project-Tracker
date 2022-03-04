import { useState, useEffect } from "react";
import axios from "axios";

export default function useTicketDetails(project_id, ticket_id) {
  const [ticket, setTicket] = useState([]);
  const [ticketState, setTicketState] = useState({
    name: "",
    description: "",
    status: "",
    priority: "",
  });

  useEffect(() => {
    axios
      .get(
        `http://localhost:8080/api/projects/${project_id}/tickets/${ticket_id}`
      )
      .then((details) => {
        console.log(details.data);
        setTicket(...ticket, details.data);
        setTicketState({
          ...ticket,
          name: details.data[0].name,
          description: details.data[0].description,
          status: details.data[0].status,
          priority: details.data[0].priority,
        });
      })
      .catch((err) => console.log(err));
  }, []);
  return {
    ticket,
    setTicket,
    ticketState,
    setTicketState,
  };
}
