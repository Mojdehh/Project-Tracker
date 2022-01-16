import { useState, useEffect } from "react";
import axios from "axios";

export default function useProjectDetail(project_id) {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/projects/${project_id}`)
      .then((details) => {
        setProjects(...projects, details.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return projects;
}
