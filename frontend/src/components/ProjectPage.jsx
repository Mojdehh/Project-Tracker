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

export default function ProjectPage() {
  let { project_id } = useParams();

  const { projects, setProjects, projectName, setProjectName } =
    useProjectDetail(project_id);
  // const [ticketRow, setTicketRows] = React.useState([]);

  const { tickets, setTickets } = useTicketsData(project_id);
  const [resetName, setResetName] = React.useState();
  const [status, setStatus] = React.useState();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);

  console.log("status project page", status);

  function editProject() {
    return axios
      .put(`http://localhost:8080/api/projects/${project_id}`, {
        projectName,
        status: status,
      })
      .then((response) => {
        console.log("response project pg", response.data);
        setProjects(response.data);
      })
      .catch((err) => console.log(err));
  }

  const handleSaveChanges = () => editProject();
  // React.useEffect(() => {
  //   setTicketRows(state);
  // }, [ticketRow]);
  // console.log("projects page", projects);
  console.log("tickets length", tickets.length);
  console.log("tickets ", tickets);
  

  return (
    <>
      <BreadCrumbs projectName={projectName} />
      <InteractiveList
        resetName={resetName}
        projects={projects}
        projectName={projectName}
        setProjectName={setProjectName}
        setResetName={setResetName}
        handleSaveChanges={handleSaveChanges}
        status={status}
        setStatus={setStatus}
      />
      <TicketPopUp
        name="Add a Ticket"
        add="Create new Ticket"
        tickets={tickets}
        setTickets={setTickets}
      />
      <SearchField
        label="Search Tickets"
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm}
        searchResults={searchResults} 
        setSearchResults={setSearchResults}
        state={tickets}
      />
      {tickets.length > 0 
        ? <TicketsTable
            name="Ticket Name"
            description="Description"
            priority="Priority"
            status="Status"
            date="Date Created"
            tickets={searchTerm.length < 1 ? tickets : searchResults}
            setTickets={setTickets}
          />
        : "No Tickets Found!"
    }
    </>
  );
}
