import { useState, useEffect } from "react";
import axios from "axios";

export default function useProjectsData(value) {
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState({});
  
  function refresh() {
    return axios
    .get("http://localhost:8080/api/projects/details")
    .then((details) => {
      console.log(details.data);
      setProjects(...projects, details.data);
    })
    .catch((err) => console.log(err));
  }

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/projects/details/devs")
      .then((details) => {
        console.log(details.data);
        setProjects(...projects, details.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return { projects, project, refresh };
}