import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Buttons from "./Button";
import BasicTable from "./BasicTable";
import TicketsTable from "./TicketsTable";
import InteractiveList from "./InteractiveList";
import useProjectDetail from "../hooks/useProjectsData";

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
  const projects = useProjectDetail();

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
          />
        <Buttons />
      </TabPanel>
    </Box>
  );
}
