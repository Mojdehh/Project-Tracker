import * as React from "react";
import axios from "axios";
import { useParams } from "react-router";
import TicketPopUp from "./TicketPopUp";
import BreadCrumbs from "./BreadCrumbs";
import SearchField from "./SearchField";
import TicketsTable from "./TicketsTable";
import InteractiveList from "./InteractiveList";
import useTicketsData from "../hooks/useTicketsData";
import useProjectDetail from "../hooks/useProjectDetail";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
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

  const { tickets, setTickets } = useTicketsData(project_id);
  const [resetName, setResetName] = React.useState();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const [userId, setUserId] = React.useState([]);
  const [names, setNames] = React.useState([]);

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

  return (
    <>
      <div>
        <BreadCrumbs projectName={projectName} projects={projects} />
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
      </div>

      <div>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
            "& > :not(style)": {
              mt: 3,
              pt: 2.5,
              width: 1000,
              height: 90,
            },
          }}
        >
          <Paper elevation={4}>
            <Grid
              container
              rowSpacing={10}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item sx={{ ml: 7 }}>
                <SearchField
                  label="Search Tickets"
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  state={searchResults}
                  setProjects={setSearchResults}
                  state={tickets}
                />
              </Grid>
              <Grid item sx={{ ml: 33, mt: 2 }}>
                <TicketPopUp
                  name="Add a Ticket"
                  add="Create new Ticket"
                  tickets={tickets}
                  setTickets={setTickets}
                />
              </Grid>
            </Grid>

            <br />
            <br />
            <br />

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
              <Chip label="No Tickets Added" />
            )}
            <br />
            <br />
          </Paper>
        </Box>
      </div>
    </>
  );
}