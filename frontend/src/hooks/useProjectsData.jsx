import { useState, useEffect } from "react";
import axios from "axios";

export default function useProjectsData(initial) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/projects/details/devs")
      .then((details) => {
        console.log(details.data);
        setProjects(...projects, details.data);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log("projects->", projects);
  return projects;
}
