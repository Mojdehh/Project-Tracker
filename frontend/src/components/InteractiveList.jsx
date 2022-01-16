import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import useProjectDetail from "../hooks/useProjectDetail";
import { useParams } from "react-router-dom";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function InteractiveList(props) {
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);
  let { project_id } = useParams();
  console.log(project_id);
  const projects = useProjectDetail(project_id);
  console.log(`projects:`, props.projects);
  if (projects.length === 0) return "loading";
  return (
     <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
    <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
      {projects[0].name}
    </Typography>
    <Demo>
      <List dense={dense}>
        <ListItem>
          <ListItemText primary="Status" secondary={projects[0].status} />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Date Created"
            secondary={projects[0].date_created}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Number of Assigned Developers"
            secondary={projects[0].devs}
          />
        </ListItem>
      </List>
    </Demo>
  </Box>
  
    
  );
}
