import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import BasicTable from "./BasicTable";
import TicketsTable from "./TicketsTable";
import InteractiveList from "./InteractiveList";
import useProjectDetail from "../hooks/useProjectsData";
import ProjectPopUp from "./ProjectPopUp";
import { useState } from "react";
import useApplicationData from "../hooks/useApplicationData";
import axios from "axios";
import { getTableContainerUtilityClass } from "@mui/material";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function VerticalNav() {
  const [value, setValue] = React.useState(0);
  const [tableRow, setTableRows] = React.useState([]);
  const projects = useProjectDetail();
  const { state } = useApplicationData();
  // const [list, setList] = useState([...state]);
  // console.log("list", list);
  const [counter, setCounter] = React.useState(0);

  React.useEffect(() => {
    setTableRows(state);
  }, [state]);

  function addProject(value) {
    console.log("value:", value);
    return axios
      .post("http://localhost:8080/api/projects", {
        projectName: value,
      })
      .then(
        (response) => {
          console.log("response", response);
          // if we dont want to make a second get request use line 73
          //setTableRows([...tableRow, response.data[0]]);
          axios
            .get("http://localhost:8080/api/projects/details")
            .then((details) => {
              console.log("detials", details.data);
              setTableRows(details.data);
            });
          return state;
        },
        (error) => {
          console.log(error);
        }
      );
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClick = (value, event) => {
    event.preventDefault();
    addProject(value);
    //handleClose();
    // props.setList(value);
    // forceUpdate();
    setCounter(counter + 1);
  };
  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: 224,
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: "divider" }}
      >
        <Tab label="Dashboard" {...a11yProps(0)} />
        <Tab label="Projects" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        {/* Dashboard */}
      </TabPanel>
      <TabPanel value={value} index={1}>
        Projects
        {/* <InteractiveList projects={projects} />
        <TicketsTable
          name="Ticket Name"
          description="Description"
          priority="Priority"
          status="Status"
          date="Date Created"
        /> */}
        <BasicTable
          name="Project Name"
          number="Number of Tickets"
          status="Project Status"
          date="Date Created"
          state={tableRow}
          counter={counter}
        />
        <ProjectPopUp
          name="Add a Project"
          add="create new project"
          // list={list}
          // setList={setList}
          counter={counter}
          setCounter={setCounter}
          handleClick={handleClick}
        />
      </TabPanel>
    </Box>
  );
}
