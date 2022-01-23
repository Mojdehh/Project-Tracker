import * as React from "react";
import InteractiveList from "./InteractiveList";
import TicketsTable from "./TicketsTable";
import TicketPopUp from "./TicketPopUp";
import BreadCrumbs from "./BreadCrumbs";
import useTicketsData from "../hooks/useTicketsData";
import useProjectDetail from "../hooks/useProjectDetail";
import { useParams } from "react-router";
import axios from "axios";
import SearchField from "./SearchField";
import { useRadioGroup } from "@mui/material";

export default function ProjectPage() {
  let { project_id } = useParams();

  const { projects, setProjects, projectName, setProjectName } =
    useProjectDetail(project_id);
  // const [ticketRow, setTicketRows] = React.useState([]);

  const { tickets, setTickets } = useTicketsData(project_id);
  const [resetName, setResetName] = React.useState();
  const [status, setStatus] = React.useState();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const [userId, setUserId] = React.useState([]);
  const [names, setNames] = React.useState([]);

  console.log("status project page", status);
  console.log("setUserId", userId);
  React.useEffect(() => {
    return axios
      .get("http://localhost:8080/api/users")
      .then((users) => {
        setNames(users.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  // users = [2, 3, 4] projectID = 2
  // users = 2, 3, 5 projectID = 2
  // axios.get(`http://localhost:8080/api/projects/${project_id}/user_project)
  function editProject(projectName, event, status, ids) {
    console.log("userId", ids);
    return axios
      .put(`http://localhost:8080/api/projects/${project_id}`, {
        projectName,
        status: status,
      })
      .then((response) => {
        console.log(response);
        axios
          .get(`http://localhost:8080/api/projects/${project_id}/user_project`)
          .then((response) => {
            ids.forEach((id) => {});
          });
        ids.forEach((id) => {
          console.log("line 50 id", id);
          axios
            .get(`http://localhost:8080/api/projects/${project_id}/${id}`)
            .then((response) => {
              console.log("line 55 res", response);
              if (response.data.length === 0) {
                return axios
                  .post("http://localhost:8080/api/projects/users", {
                    project_id,
                    project_name: projectName,
                    user_id: id,
                  })
                  .then((response) => {
                    console.log(response);
                  });
              } else {
                console.log(response.data);
                const user_projectID = response.data[0].id;
                axios
                  .put(`http://localhost:8080/api/projects/${project_id}`, {
                    project_id,
                    user_id: id,
                    projectName,
                    user_project_id: user_projectID,
                  })
                  .then((response) => {
                    console.log(response);
                  });
              }
            });
        });

        // console.log("response project pg", response.data);
        // ids.forEach((user) => {
        //   axios
        //     .put("http://localhost:8080/api/projects/users", {
        //       project_id: project_id,
        //       projectName,
        //       user_id: user,
        //     })
        //     .then((response) => {
        //       console.log(response);
        //       setProjects(response.data);
        //     });
        // });
      })
      .catch((err) => console.log(err));
  }

  const handleSaveChanges = (projectName, event, status, ids) =>
    editProject(projectName, event, status, ids);

  // React.useEffect(() => {
  //   setTicketRows(state);
  // }, [ticketRow]);
  // console.log("projects page", projects);
  console.log("tickets length", tickets.length);
  console.log("tickets ", tickets);

  return (
    <>
      <BreadCrumbs projectName={projectName} />
      <InteractiveList
        resetName={resetName}
        projects={projects}
        projectName={projectName}
        setProjectName={setProjectName}
        setResetName={setResetName}
        handleSaveChanges={handleSaveChanges}
        status={status}
        setStatus={setStatus}
        userId={userId}
        setUserId={setUserId}
        names={names}
        setNames={setNames}
      />
      <TicketPopUp
        name="Add a Ticket"
        add="Create new Ticket"
        tickets={tickets}
        setTickets={setTickets}
      />
      <SearchField
        label="Search Tickets"
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        state={searchResults}
        setProjects={setSearchResults}
        state={tickets}
      />
      {tickets.length > 0 ? (
        <TicketsTable
          name="Ticket Name"
          description="Description"
          priority="Priority"
          status="Status"
          date="Date Created"
          tickets={searchTerm.length < 1 ? tickets : searchResults}
          setTickets={setTickets}
        />
      ) : (
        "No Tickets Found!"
      )}
    </>
  );
}
