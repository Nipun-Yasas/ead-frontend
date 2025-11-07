import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";
import { ChatProvider } from "./contexts/ChatContext";
import AuthContainer from "./components/auth/AuthContainer";

import Navbar from "./components/landing/Navbar";
import Hero from "./components/landing/Hero";
import AboutSection from "./components/landing/AboutSection";
import WhyChooseUs from "./components/landing/WhyChooseUs";
import LeadershipTeam from "./components/landing/LeadershipTeam"
import Certificate from "./components/landing/Certificate";
import Footer from "./components/landing/Footer";

import BookingAppointment from "./components/customer/BookingAppointment";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import DashboardLayout from "./components/layouts/DashboardLayout";
import GetStarted from "./components/landing/GetStarted";
import AdminDashboard from "./components/admin/dashboard/AdminDashboard";
import ChatInterface from "./components/chat/ChatInterface";
import AppointmentsByStatus from "./components/admin/appointments/AppointmentsByStatus";
import TaskAllocationPage from "./components/admin/adminTaskAllocation/TaskAllocationPage";
import Invoices from "./components/admin/invoices/Invoices";
import Dashboard from "./components/superAdmin/dashboard/Dashboard";
import { Chatbot } from "./components/chat/Chatbot";
import Users from "./components/superAdmin/users/Users";
import { MyAppoiment } from "./components/customer/MyAppoiment";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <Navbar />
                <Hero />
                <AboutSection />
                <WhyChooseUs />
                <LeadershipTeam />
                <Certificate />
                <GetStarted />
                <Footer />
              </div>
            }
          />
          <Route path="/login" element={<AuthContainer />} />
          <Route path="/signup" element={<AuthContainer />} />
          <Route path="/my-appointment" element={<ProtectedRoute allowedRoles={["CUSTOMER"]}>
            <MyAppoiment />
          </ProtectedRoute>} />


          <Route
            path="/superadmin"
            element={
              <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route
              path="dashboard"
              element={<Dashboard />}
            />
            <Route path="users" element={<Users />} />
          </Route>

          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
                         <Route path="task-allocation" element={<TaskAllocationPage />} /> 

            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="appointments/:status" element={<AppointmentsByStatus />} />
            <Route path="invoices" element={<Invoices />} />
          </Route>

          <Route
            path="/employee"
            element={
              <ProtectedRoute allowedRoles={["EMPLOYEE"]}>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<div>Employee Dashboard</div>} />
            <Route path="products" element={<div>Products</div>} />
            <Route path="orders" element={<div>My Orders</div>} />
            <Route path="reports" element={<div>Reports</div>} />
            <Route index element={<Navigate to="dashboard" replace />} />
          </Route>

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={["CUSTOMER"]}>
               
                  <BookingAppointment />
              
              </ProtectedRoute>
            }
          />

          {/* Chat Route - Navigate via URL */}
          <Route
            path="/chat"
            element={
              <ProtectedRoute allowedRoles={['CUSTOMER', 'EMPLOYEE']}>
                <ChatProvider>
                  <ChatInterface />
                </ChatProvider>
              </ProtectedRoute>
            }
          />
        </Routes>
        
        {/* Global Chatbot - Available on all pages */}
        <Chatbot />
      </AuthProvider>
    </Router>
  );
}

export default App;
