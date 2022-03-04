import "./App.css";
import * as React from "react";
import axios from "axios";
import { Route, Link, Routes } from "react-router-dom";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import TicketPage from "./components/TicketPage";
import VerticalNav from "./components/VerticalNav";
import ProjectPage from "./components/ProjectPage";
import PageNotFound from "./components/PageNotFound";
axios.defaults.withCredentials = true;

function App() {
  return (
    <div className="App">
      <>
        <NavBar className="NavBar"/>
        <Routes>
        <Route path="/login" element={<Login />}></Route>
          <Route path="/" element={<VerticalNav />}></Route>
          <Route
            path="/projects/:project_id"
            element={
              <>
                <ProjectPage />
              </>
            }
          ></Route>
          <Route
            path="/projects/:project_id/tickets/:ticket_id"
            element={
              <>
                <TicketPage />
              </>
            }
          ></Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
      </>
    </div>
  );
}

export default App;
