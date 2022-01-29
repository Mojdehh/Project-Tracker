import { useState, useEffect } from "react";
import axios from "axios";

export default function useTicketsData(project_id) {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/projects/${project_id}/tickets`)
      .then((details) => {
        console.log(details.data);
        setTickets(details.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return { tickets, setTickets };
}
