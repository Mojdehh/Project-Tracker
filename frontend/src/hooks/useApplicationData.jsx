import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(initial) {
  const [state, setState] = useState([]);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/projects/details")
      .then((details) => {
        console.log(details.data);
        setState(...state, details.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return { state, setState };
}