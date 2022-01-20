import { useState, useEffect } from "react";
import axios from "axios";

export default function useProjectDetail(project_id) {
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState("");
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/projects/${project_id}`)
      .then((details) => {
        console.log("details name", details.data);
        setProjects(...projects, details.data);
        setProjectName(details.data[0].name);
      })
      .catch((err) => console.log(err));
  }, []);
  return { projects, setProjects, projectName, setProjectName };
}
