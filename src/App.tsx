import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthContainer from "./components/auth/AuthContainer";
import OurServices from "./components/ourServices";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/ourServices" element={<OurServices />} />
        <Route path="/login" element={<AuthContainer />} />
        <Route path="/signup" element={<AuthContainer />} />
      </Routes>
    </Router>
  );
}

