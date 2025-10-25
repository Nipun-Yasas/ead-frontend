import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthContainer from "./components/auth/AuthContainer";
import AboutSection from "./components/aboutSection/AboutSection";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<AuthContainer />} />
        <Route path="/signup" element={<AuthContainer />} />
        <Route path="/about" element={<AboutSection />} />
      </Routes>
    </Router>
  );
}

