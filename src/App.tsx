import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Certificate from "./components/Certificate";
import Experience from "./components/Experiance";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/certificate" element={<Certificate/>}/>
         <Route path="/experiance" element={<Experience/>}/>
      </Routes>
    </Router>
  );
}

export default App;
