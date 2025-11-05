import "./App.css";
import VehicleRepairs from "./components/VehicleRepairs";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";
import { ChatProvider } from "./contexts/ChatContext";
import AuthContainer from "./components/auth/AuthContainer";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutSection from "./components/aboutSection/AboutSection";
import WhyChooseUs from "./components/WhyChooseUs";
import LeadershipTeam from "./components/Leadership/LeadershipTeam"
import Certificate from "./components/Certificate";
import Footer from "./components/Footer";

import BookingAppointment from "./components/BookingAppointment";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import DashboardLayout from "./components/layouts/DashboardLayout";
import GetStarted from "./components/main/GetStarted";
import AdminDashboard from "./components/admin/dashboard/AdminDashboard";
import ChatInterface from "./components/chat/ChatInterface";
import TaskAllocationPage from "./components/adminTaskAllocation/TaskAllocationPage";

import Dashboard from "./components/superaAdmin/dashboard/Dashboard";
import { Chatbot } from "./components/chat/Chatbot";
import Users from "./components/superaAdmin/users/Users";

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
             <Route path="task-allocation" element={<TaskAllocationPage />} /> 
            <Route path="users" element={<Users />} />
            <Route path="inventory" element={<div>Inventory</div>} />
            <Route path="settings" element={<div>Settings</div>} />
            <Route index element={<Navigate to="dashboard" replace />} />
          </Route>

          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
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
                <div>
                  Customer Dashboard
                  <BookingAppointment />
                  <VehicleRepairs />
                </div>
              
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
