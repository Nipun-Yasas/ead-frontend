import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthContainer from "./components/auth/AuthContainer";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<AuthContainer />} />
        <Route path="/signup" element={<AuthContainer />} />
      </Routes>
    </Router>
  );
}

