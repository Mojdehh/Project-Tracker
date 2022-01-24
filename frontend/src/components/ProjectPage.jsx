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
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

export default function ProjectPage() {
  let { project_id } = useParams();

  const {
    projects,
    setProjects,
    projectName,
    setProjectName,
    status,
    setStatus,
  } = useProjectDetail(project_id);
  // const [ticketRow, setTicketRows] = React.useState([]);

  const { tickets, setTickets } = useTicketsData(project_id);
  const [resetName, setResetName] = React.useState();
  //const [status, setStatus] = React.useState();
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

  function editProject(projectName, event, status, ids) {
    console.log("userId", ids);
    console.log("status on edit pro", status);
    return axios
      .put(`http://localhost:8080/api/projects/${project_id}`, {
        projectName,
        status: status,
      })
      .then((response) => {
        console.log(response);
        axios
          .delete(
            `http://localhost:8080/api/projects/${project_id}/user_project`
          )
          .then((response) => {
            ids.forEach((id) => {
              axios
                .post("http://localhost:8080/api/projects/user_project", {
                  project_id,
                  project_name: projectName,
                  user_id: id,
                })
                .then((response) => {
                  console.log("new user_project table", response);
                  axios
                    .get(`http://localhost:8080/api/projects/${project_id}`)
                    .then((details) => {
                      setProjects(details.data);
                    })
                    .catch((err) => console.log(err));
                });
            });
          })
          .catch((err) => console.log(err));
      });
  }

  const handleSaveChanges = (projectName, event, status, ids) =>
    editProject(projectName, event, status, ids);

  // React.useEffect(() => {
  //   setTicketRows(state);
  // }, [ticketRow]);
  // console.log("projects page", projects);
  // console.log("tickets length", tickets.length);
  // console.log("tickets ", tickets);

  return (
    <>
      <div>
        <BreadCrumbs projectName={projectName} projects={projects} />
        {/* <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
            "& > :not(style)": {
              m: 1,
              pt: 2,
              pb: 2,
              mt: 3,

              width: 1000,
              height: 57,
            },
          }}
        > */}

        <Paper elevation={4}>
          {/* <Grid containder sx={{ height: 1000 }}> */}
          {/* <Grid container sx={{display: "flex", flexDirection: "row",  color: "#004d40"}}> */}
          <div>
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
          </div>
          {/* </Grid > */}
        </Paper>
          {/* </Box> */}
      </div>

      <div>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
            
            // flexWrap: 'wrap',
            "& > :not(style)": {
              mt: 3,
              pt: 2.5,
              width: 1000,
              height: 90,
            },
          }}>

          <Paper elevation={4}>
          {/* <Grid  sx={{ ml: 100, mt: 10 }}> */}

            <Grid container rowSpacing={10} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

              <Grid item xs={6}>
                <SearchField
                  label="Search Tickets"
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  state={searchResults}
                  setProjects={setSearchResults}
                  state={tickets}
                />
              </Grid>

              <Grid item xs={3}>
                <TicketPopUp
                  name="Add a Ticket"
                  add="Create new Ticket"
                  tickets={tickets}
                  setTickets={setTickets}
                />
              </Grid>

            </Grid >
         {/* </Grid > */}

            <br />
            <br />
            <br />

          {/* <Grid containder sx={{  height: 450 }}> */}

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
            {/* </Grid > */}
          </Paper>
        </Box>
      </div>
    </>
  );
}
