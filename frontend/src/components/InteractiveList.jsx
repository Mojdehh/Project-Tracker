import * as React from "react";
import { useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { formatDateTime } from "../Helper/dateHelperFuncs.ts"
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import List from "@mui/material/List";
import Card from "@mui/material/Card";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import EditProjectPopUp from "./EditProjectPopUp";
import CardContent from "@mui/material/CardContent";
import CircularUnderLoad from "./CircularUnderLoad";
import ListItemText from "@mui/material/ListItemText";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function InteractiveList(props) {
  const [dense, setDense] = React.useState(true);
  const [secondary, setSecondary] = React.useState(false);
  let { project_id } = useParams();

  const assignedDevs = (projects) => {
    const devs = [];
    for (let each of projects) {
      devs.push(each.devs);
    }
    return devs.join(", ");
  };

  const arrAssignedDevs = (project) => {
    const devs = [];
    for (let item of project) {
      devs.push(item.devs);
    }
    return devs;
  };

  const arrOfDevs = arrAssignedDevs(props.projects);

  if (props.projects.length === 0) return <CircularUnderLoad />;
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "row",
        "& > :not(style)": {
          m: 1,
          pt: 2,
          pb: 2,
          mt: 2,
          width: 1000,
          height: 230,
        },
      }}
    >
      <Card
        elevation={4}
        sx={{ mt: 1, mb: 2, display: "block", width: "60vw" }}
      >
        <CardContent>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Box
              sx={{
                flexGrow: 1,
                maxWidth: 1000,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography sx={{ mt: 1, mb: 1 }} variant="h6" component="div">
                {props.projects[0].name}
              </Typography>
              <Demo>
                <List
                  sx={{
                    display: "flex", flexDirection: "row", justifyContent: "space-around"
                  }}
                  dense={dense}
                >
                  <ListItem>
                    <ListItemText
                      primary="Status"
                      primaryTypographyProps={{
                        display: "flex",
                        textalign: "center",
                        justifyContent: "center",
                      }}
                      secondary={props.projects[0].status}
                      secondaryTypographyProps={{
                        display: "flex",
                        textalign: "center",
                        justifyContent: "center",
                      }}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Assigned Developers"
                      primaryTypographyProps={{
                        display: "flex",
                        textalign: "center",
                        justifyContent: "center",
                      }}
                      secondary={assignedDevs(props.projects)}
                      secondaryTypographyProps={{
                        display: "flex",
                        textalign: "center",
                        noWrap: true,
                        justifyContent: "center",
                      }}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Date Created"
                      primaryTypographyProps={{
                        display: "flex",
                        textalign: "center",
                        justifyContent: "center",
                      }}
                      secondary={
                        formatDateTime(props.projects[0].date_created)
                      }
                      secondaryTypographyProps={{
                        display: "flex",
                        textalign: "center",
                        justifyContent: "center",
                      }}
                    />
                  </ListItem>
                  {props.projects[0].date_updated && (
                    <ListItem>
                      <ListItemText
                        primary="Date Updated"
                        primaryTypographyProps={{
                          display: "flex",
                          textalign: "center",
                          justifyContent: "center",
                        }}
                        secondary={
                          formatDateTime(props.projects[0].date_updated)
                        }
                        secondaryTypographyProps={{
                          display: "flex",
                          textalign: "center",
                          justifyContent: "center",
                        }}
                      />
                    </ListItem>
                  )}
                </List>
              </Demo>
            </Box>
          </div>
          <Grid sx={{ mt: 4 }}>
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
              arrOfDevs={arrOfDevs}
              userId={props.userId}
              setUserId={props.setUserId}
              names={props.names}
              setNames={props.setNames}
            />
          </Grid>
        </CardContent>
      </Card>
    </Box >
  );
}