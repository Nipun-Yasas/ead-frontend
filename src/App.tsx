import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthContainer from "./components/auth/AuthContainer";
import OurServicesBanner from "./components/ourServicesBanner";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<OurServicesBanner />} />
        <Route path="/login" element={<AuthContainer />} />
        <Route path="/signup" element={<AuthContainer />} />
      </Routes>
    </Router>
  );
}

