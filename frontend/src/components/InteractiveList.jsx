import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import EditProjectPopUp from "./EditProjectPopUp";
import { useParams } from "react-router-dom";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function InteractiveList(props) {
  const [dense, setDense] = React.useState(true);
  const [secondary, setSecondary] = React.useState(false);
  let { project_id } = useParams();
  console.log(project_id);

  const assignedDevs = (projects) => {
    const devs = [];
    for (let each of projects) {
      devs.push(each.devs);
    }
    return devs.join(", ");
  };

  if (props.projects.length === 0) return "loading";
  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
      <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
        {props.projects[0].name}
      </Typography>
      <EditProjectPopUp
        name="Edit Project"
        add="Edit Project"
        title={props.projects[0].name}
        devs={props.projects}
        projects={props.projects}
        setProjects={props.setProjects}
        projectName={props.projectName}
        setProjectName={props.setProjectName}
        resetName={props.resetName}
        setResetName={props.setResetName}
        handleSaveChanges={props.handleSaveChanges}
        status={props.status}
        setStatus={props.setStatus}
      />
      <Demo>
        <List dense={dense}>
          <ListItem>
            <ListItemText
              primary="Status"
              secondary={props.projects[0].status}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Date Created"
              secondary={props.projects[0].date_created}
            />
            {props.projects[0].date_updated && (
              <ListItem>
                <ListItemText
                  primary="Date Updated"
                  secondary={props.projects[0].date_updated}
                />
              </ListItem>
            )}
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Assigned Developers"
              secondary={assignedDevs(props.projects)}
            />
          </ListItem>
        </List>
      </Demo>
    </Box>
  );
}
