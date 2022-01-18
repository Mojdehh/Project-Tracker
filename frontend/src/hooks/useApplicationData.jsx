import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(initial) {

  const [state, setState] = useState([]);
  const [tickets, setTickets] = useState([]);

   function addProject(value) {
    console.log("value:", value);
     return axios.post('http://localhost:8080/api/projects', {
        projectName: value
      })
      .then((response) => {
        console.log(response);
        // setState([...state, response.data]);
        axios.get("http://localhost:8080/api/projects/details")
        .then((details) => {
          console.log(details.data);
          setState(details.data);
        })
        return state;

      }, (error) => {
        console.log(error);
      });
  
  }


  useEffect(() => {
    axios
      .get("http://localhost:8080/api/projects/details")
      .then((details) => {
        console.log(details.data);
        setState(...state, details.data);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log("state->", state);
  return {state, addProject};

}

