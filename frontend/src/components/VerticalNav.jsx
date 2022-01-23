import React, { useRef } from "react";
import BasicTable from "./BasicTable";
import ProjectPopUp from "./ProjectPopUp";
import useApplicationData from "../hooks/useApplicationData";
import axios from "axios";
import SearchField from "./SearchField";
import ButtonSort from "./ButtonSort";
import Paper from "@mui/material/Paper";
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import ContentPasteRoundedIcon from '@mui/icons-material/ContentPasteRounded';

export default function VerticalNav(props) {
  const [userId, setUserId] = React.useState([]);
  const { state, setState } = useApplicationData();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [projects, setProjects] = React.useState([]);
  const [filterSelected, setFilterSelected] = React.useState("All")

  React.useEffect(() => {
    setProjects(state);
  }, [state]);

  function addProject(value) {
    console.log("xxxxxxxxxxxxx", value);
    return axios
      .post("http://localhost:8080/api/projects", {
        projectName: value,
      })
      .then(
        (response) => {
          // if userId.length > 1 for each run post request
          // if not just run once
          // console.log("res", response);
          const projectID = response.data[0].id;
          const projectTitle = response.data[0].name;
          userId.forEach((user) => {
            axios
              .post("http://localhost:8080/api/projects/users", {
                project_id: projectID,
                project_name: projectTitle,
                user_id: user,
              })
              .then((response) => {
                // if we dont want to make a second get request use line 73
                //setTableRows([...tableRow, response.data[0]]);
                axios
                  .get("http://localhost:8080/api/projects/details")
                  .then((details) => {
                    console.log("details++++++++++++++++", details.data);
                    setState(details.data);
                    // setProjects(details.data);
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
    //validate(value);
    //addProject(value);
  };

  const filteredSearchResults = () => {
    if(filterSelected === "All") {
      return projects;
    }
    console.log("SRCH RESULT ---- ", projects);
    return projects.filter((result) => {
      console.log("RESULT---", result)
      return result.status === filterSelected;
    })

  }

  return (
    
    <>
    
<div >
<Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        '& > :not(style)': {
          m: 1,
          
          width: 1000,
          height: 57,
        },
      }}
    >
      <Paper elevation={1} >
        <Grid container>
          <ContentPasteRoundedIcon sx={{mt: 1.5}} fontSize="large" />
        <div>
          <Typography variant="h6" align='left' >
            Project Dashboard
          </Typography>
          <Typography
            
          >
            A curated list of all your projects
          </Typography>
        </div>
</Grid>
      </Paper>
      </Box>
</div>

    <div>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        
        // flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          pt: 1.5,
          width: 1000,
          height: 120,
        },
      }}
    >

      <Paper elevation={4}>
        <Grid container justifyContent='space-around'>
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
        
        <Grid container sx={{ ml: 10 }}>
        <ProjectPopUp
          name="Add a Project"
          add="create new project"
          userId={userId}
          setUserId={setUserId}
          handleClick={handleClick}
          addProject={addProject}
        />
        </Grid>
        <br />
        
    
    <Grid containder sc={{ height: 100 }}>
      <BasicTable
        name="Project Name"
        number="Number of Tickets"
        status="Project Status"
        date="Date Created"
        state={filteredSearchResults()}
        />
        </Grid>
        </Paper>
  </Box>
      </div>

    </>
  );
}
