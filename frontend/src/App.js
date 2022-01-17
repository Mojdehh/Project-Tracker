import "./App.css";
import VerticalNav from "./components/VerticalNav";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import AddButton from "./components/AddButton";
import InteractiveList from "./components/InteractiveList";
import TicketsTable from "./components/TicketsTable";
import TicketsList from "./components/TicketsList";
import CommentSection from "./components/CommentSection";

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
              <AddButton name="Add a ticket" />
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
          element={
            <>
              <TicketsList />
              <AddButton name="Add a comment" />
              <CommentSection />
            </>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
