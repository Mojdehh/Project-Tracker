import "./App.css";
import VerticalNav from "./components/VerticalNav";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import Buttons from "./components/Button";
import InteractiveList from "./components/InteractiveList";
import TicketsTable from "./components/TicketsTable";
import TicketsList from "./components/TicketsList";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<VerticalNav />}></Route>
        <Route
          path="/projects/:project_id"
          element={
            <>
              <InteractiveList />
              <TicketsTable
                name="Ticket Name"
                description="Description"
                priority="Priority"
                status="Status"
                date="Date Created"
              />
            </>
          }
        ></Route>
        <Route
          path="/projects/:project_id/tickets/:ticket_id"
          element={<TicketsList />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
