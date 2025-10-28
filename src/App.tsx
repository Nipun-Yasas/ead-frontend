import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Hero from "./components/Hero";
import Cetificate from "./components/Cetificate";
import Experiance from "./components/Experiance";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/hero" element={<Hero/>}/>
        <Route path="/cetificate" element={<Cetificate/>}/>
        <Route path="/experiance" element={<Experiance/>}/>
      </Routes>
    </Router>
  );
}

export default App;
