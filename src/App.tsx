import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import VehicleRepairs from "./components/VehicleRepairs";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/repair-services" element = {<VehicleRepairs/>} />
      </Routes>
    </Router>
  );
}

export default App;
