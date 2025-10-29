import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthContainer from "./components/auth/AuthContainer";
import BookingAppointment from "./components/BookingAppointment";
import WhyChooseUs from "./components/WhyChooseUs";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<AuthContainer />} />
        <Route path="/book" element={<BookingAppointment />} />
        <Route path="/signup" element={<AuthContainer />} />
        <Route path="/whyChooseUs" element={<WhyChooseUs />} />

      </Routes>
    </Router>
  );
}

