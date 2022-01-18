import { useState, useEffect } from "react";
import axios from "axios";

export default function useProjectsData(value) {
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState({});
  function addProject(value) {
    console.log("value:", value);
     return axios.post('http://localhost:8080/api/projects', {
        projectName: value
      })
      .then((response) => {
        console.log(response);
      }, (error) => {
        console.log(error);
      });
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
  // console.log("projects->", projects);
  return { projects, project, addProject };
}




