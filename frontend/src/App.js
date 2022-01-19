import "./App.css";
import VerticalNav from "./components/VerticalNav";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import AddButton from "./components/AddButton";
import TicketsList from "./components/TicketsList";
import CommentSection from "./components/CommentSection";
import CommentPopUp from "./components/CommentPopup";
import NavBar from "./components/NavBar";
import BreadCrumbs from "./components/BreadCrumbs";
import ProjectPage from "./components/ProjectPage";

function App() {
  return (
    <div className="App">
      <>
        <NavBar />
        <Routes>
          <Route path="/" element={<VerticalNav />}></Route>
          <Route
            path="/projects/:project_id"
            element={
              <>
              <ProjectPage />
                {/* <BreadCrumbs project={"project name"} />
                <InteractiveList />
                <TicketPopUp name="Add a Ticket" add="Create new Ticket" />
                <TicketsTable
                  name="Ticket Name"
                  description="Description"
                  priority="Priority"
                  status="Status"
                  date="Date Created"
                /> */}
              </>
            }
          ></Route>
          <Route
            path="/projects/:project_id/tickets/:ticket_id"
            element={
              <>
                <BreadCrumbs
                  projectName={"Project Name"}
                  ticket={"Ticket Name"}
                />
                <TicketsList />
                <CommentPopUp />
                <CommentSection />
              </>
            }
          ></Route>
        </Routes>
      </>
    </div>
  );
}

export default App;
