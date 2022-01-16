import "./App.css";
import VerticalNav from "./components/VerticalNav";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import Buttons from "./components/Button";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<VerticalNav />}></Route>
        <Route path="/dashboard" element={<Buttons />}></Route>
      </Routes>
    </div>
  );
}

export default App;
