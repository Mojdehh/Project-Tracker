import React, { useRef } from "react";
import axios from "axios";
import BasicTable from "./BasicTable";
import ButtonSort from "./ButtonSort";
import SearchField from "./SearchField";
import ProjectPopUp from "./ProjectPopUp";
import useApplicationData from "../hooks/useApplicationData";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import ContentPasteRoundedIcon from "@mui/icons-material/ContentPasteRounded";

export default function VerticalNav(props) {
  const [userId, setUserId] = React.useState([]);
  const { state, setState } = useApplicationData();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [projects, setProjects] = React.useState([]);
  const [filterSelected, setFilterSelected] = React.useState("All");

  // If the user is not logged in, user will be redirected to login page
  React.useEffect(() => {
    axios.get("http://localhost:8080/api/login").then((response) => {
      if (response.data.loggedIn === false) {
        window.location.href = "/login";
      }
    });
  }, []);

  React.useEffect(() => {
    setProjects(state);
  }, [state]);

  function addProject(value) {
    return axios
      .post("http://localhost:8080/api/projects", {
        projectName: value,
      })
      .then(
        (response) => {
          const projectID = response.data[0].id;
          const projectTitle = response.data[0].name;
          userId.forEach((user) => {
            axios
              .post("http://localhost:8080/api/projects/user_project", {
                project_id: projectID,
                project_name: projectTitle,
                user_id: user,
              })
              .then((response) => {
                axios
                  .get("http://localhost:8080/api/projects/details")
                  .then((details) => {
                    setState(details.data);
                  });
                return state;
              });
          });
        },
        (error) => {
          console.log(error);
        }
      );
  }

  const handleClick = (value, id, event) => {
    event.preventDefault();
  };

  const filteredSearchResults = () => {
    if (filterSelected === "All") {
      return projects;
    }
    return projects.filter((result) => {
      return result.status === filterSelected;
    });
  };

  return (
    <>
      <div>
        <Box
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
        >
          <Paper elevation={4}>
            <Grid
              container
              sx={{ display: "flex", flexDirection: "row", color: "#004d40" }}
            >
              <ContentPasteRoundedIcon sx={{ ml: 5, fontSize: 55 }} />
              <div>
                <Typography
                  variant="h5"
                  display="flex"
                  alignItems="left"
                  justifyContent="left"
                >
                  Project Dashboard
                </Typography>
                <Typography>A curated list of all your projects</Typography>
              </div>
              <Grid sx={{ ml: 100, mt: -5.8 }}>
                <ProjectPopUp
                  name="Add a Project"
                  add="create new project"
                  userId={userId}
                  setUserId={setUserId}
                  handleClick={handleClick}
                  addProject={addProject}
                  color={"#004d40"}
                />
              </Grid>
            </Grid>
          </Paper>
        </Box>
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
            <Grid container justifyContent="space-around">
              <SearchField
                label="Search Projects"
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                projects={projects}
                setProjects={setProjects}
                state={state}
              />
              <ButtonSort
                label="Radio Filter"
                filterSelected={filterSelected}
                setFilterSelected={setFilterSelected}
              />
            </Grid>

            <br />
            <br />
            <br />

            <Grid containder sx={{ height: 450 }}>
              <BasicTable
                name="Project Name"
                number="Number of Tickets"
                status="Project Status"
                date="Date Created"
                state={filteredSearchResults()}
              />
            </Grid>
            <br />
          </Paper>
        </Box>
      </div>
    </>
  );
}