import "./App.css";
import * as React from "react";
import VerticalNav from "./components/VerticalNav";
import { Route, Link, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import ProjectPage from "./components/ProjectPage";
import TicketPage from "./components/TicketPage";
import Login from "./components/Login";
import axios from "axios";
axios.defaults.withCredentials = true;


function App() {
  return (
    <div className="App">
      <>
        <NavBar />
        <Routes>
        <Route path="/login" element={<Login />}></Route>
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
                <TicketPage />
                {/* <BreadCrumbs
                  projectName={"Project Name"}
                  ticket={"Ticket Name"}
                />
                <TicketsList />
                <CommentPopUp />
                <CommentSection /> */}
              </>
            }
          ></Route>
        </Routes>
      </>
    </div>
  );
}

export default App;
