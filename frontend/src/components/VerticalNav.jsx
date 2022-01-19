import * as React from "react";
import BasicTable from "./BasicTable";
import ProjectPopUp from "./ProjectPopUp";
import useApplicationData from "../hooks/useApplicationData";
import axios from "axios";

export default function VerticalNav() {
  const [tableRow, setTableRows] = React.useState([]);
  const [userId, setUserId] = React.useState([]);
  const { state } = useApplicationData();

  React.useEffect(() => {
    setTableRows(state);
  }, [state]);

  function addProject(value) {
    return axios
      .post("http://localhost:8080/api/projects", {
        projectName: value,
      })
      .then(
        (response) => {
          const projectID = response.data[0].id;
          axios
            .post("http://localhost:8080/api/projects/users", {
              project_id: projectID,
              user_id: userId[0],
            })
            .then((response) => {
              // if we dont want to make a second get request use line 73
              //setTableRows([...tableRow, response.data[0]]);
              axios
                .get("http://localhost:8080/api/projects/details")
                .then((details) => {
                  console.log("detials", details.data);
                  setTableRows(details.data);
                });
              return state;
            });
        },
        (error) => {
          console.log(error);
        }
      );
  }

  const handleClick = (value, id, event) => {
    event.preventDefault();
    addProject(value);
  };
  return (
    <>
      <BasicTable
        name="Project Name"
        number="Number of Tickets"
        status="Project Status"
        date="Date Created"
        state={tableRow}
      />
      <ProjectPopUp
        name="Add a Project"
        add="create new project"
        userId={userId}
        setUserId={setUserId}
        handleClick={handleClick}
      />
    </>
  );
}
