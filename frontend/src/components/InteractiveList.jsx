import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import EditProjectPopUp from "./EditProjectPopUp";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

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
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card
        elevation={4}
        sx={{ mt: 3, mb: 2, display: "block", width: "75vw", height: "30vw" }}
      >
        <CardContent>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Box
              sx={{
                flexGrow: 1,
                maxWidth: 752,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                {props.projects[0].name}
              </Typography>
              <Demo>
                <List
                  sx={{ display: "flex", flexDirection: "row" }}
                  dense={dense}
                >
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
          </div>
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
        </CardContent>
      </Card>
    </div>
  );
}
// return (
//   <div style={{ display: "flex", justifyContent: "center" }}>
//     <Card
//       elevation={4}
//       sx={{ mt: 3, mb: 2, display: "block", width: "60vw" }}
//     >
//       <CardContent>
//         <div style={{ display: "flex", justifyContent: "center" }}>
//           <Box
//             sx={{
//               flexGrow: 1,
//               maxWidth: 752,
//               justifyContent: "center",
//               alignItems: "center",
//             }}
//           >
//             <Typography sx={{ mt: 2, mb: 2 }} variant="h6" component="div">
//               Ticket: {props.ticket[0].name}
//             </Typography>
//             <Typography>Details: {props.ticket[0].description}</Typography>
//             <Demo>
//               <List
//                 sx={{ display: "flex", flexDirection: "row" }}
//                 dense={dense}
//               >
//                 {/* <ListItem>
//           <ListItemText
//             primary="Description"
//             primaryTypographyProps={{
//               display: 'flex',
//               textalign: 'center',
//               justifyContent: 'center',
//             }}
//             secondary={props.ticket[0].description}
//             secondaryTypographyProps={{
//               display: 'flex',
//               textalign: 'center',
//               alignItems: 'center',
//               justifyContent: 'center',
//             }}
//           />
//         </ListItem> */}
//                 <ListItem>
//                   <ListItemText
//                     primary="Status"
//                     primaryTypographyProps={{
//                       display: "flex",
//                       textalign: "center",
//                       justifyContent: "center",
//                     }}
//                     secondary={props.ticket[0].status}
//                     secondaryTypographyProps={{
//                       display: "flex",
//                       textalign: "center",
//                       justifyContent: "center",
//                     }}
//                   />
//                 </ListItem>
//                 <ListItem>
//                   <ListItemText
//                     primary="Priority"
//                     primaryTypographyProps={{
//                       display: "flex",
//                       textalign: "center",
//                       justifyContent: "center",
//                     }}
//                     secondary={props.ticket[0].priority}
//                     secondaryTypographyProps={{
//                       display: "flex",
//                       textalign: "center",
//                       justifyContent: "center",
//                     }}
//                   />
//                 </ListItem>
//                 <ListItem>
//                   <ListItemText
//                     primary="Date Created"
//                     primaryTypographyProps={{
//                       display: "flex",
//                       textalign: "center",
//                       justifyContent: "center",
//                     }}
//                     secondary={props.ticket[0].date_created.match(/(.*)T/)[1]}
//                     secondaryTypographyProps={{
//                       display: "flex",
//                       textalign: "center",
//                       justifyContent: "center",
//                     }}
//                   />
//                 </ListItem>
//                 <ListItem>
//                   <ListItemText
//                     primary="Created By"
//                     primaryTypographyProps={{
//                       display: "flex",
//                       textalign: "center",
//                       justifyContent: "center",
//                     }}
//                     secondary={props.ticket[0].username}
//                     secondaryTypographyProps={{
//                       display: "flex",
//                       textalign: "center",
//                       justifyContent: "center",
//                     }}
//                   />
//                 </ListItem>
//               </List>
//             </Demo>
//           </Box>
//         </div>
//         <EditTicketPopUp
//           ticket={props.ticket}
//           setTicket={props.setTicket}
//           ticketState={props.ticketState}
//           setTicketState={props.setTicketState}
//           resetTicketState={props.resetTicketState}
//           setResetTicketState={props.setResetTicketState}
//           priority={props.priority}
//           setPriority={props.setPriority}
//           handleSaveChanges={props.handleSaveChanges}
//         />
//       </CardContent>
//     </Card>
//   </div>
// );
// }
