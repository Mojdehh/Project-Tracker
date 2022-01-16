import "./App.css";
import VerticalNav from "./components/VerticalNav";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import Buttons from "./components/Button";
import InteractiveList from "./components/InteractiveList";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<VerticalNav />}></Route>
        <Route
          path="/projects/:project_id"
          element={<InteractiveList />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
