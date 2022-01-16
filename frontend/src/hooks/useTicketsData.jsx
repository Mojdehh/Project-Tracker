import { useState, useEffect } from "react";
import axios from "axios";

export default function useTicketsData(initial) {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/project/tickets")
      .then((details) => {
        console.log(details.data);
        setTickets(...tickets, details.data);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log("tickets->", tickets);
  return tickets;
}
