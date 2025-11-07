import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";
import { ChatProvider } from "./contexts/ChatContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import AuthContainer from "./components/auth/AuthContainer";

import Navbar from "./components/landing/Navbar";
import Hero from "./components/landing/Hero";
import AboutSection from "./components/landing/AboutSection";
import WhyChooseUs from "./components/landing/WhyChooseUs";
import LeadershipTeam from "./components/landing/LeadershipTeam";
import Certificate from "./components/landing/Certificate";
import Footer from "./components/landing/Footer";

import BookingAppointment from "./components/customer/BookingAppointment";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import DashboardLayout from "./components/layouts/DashboardLayout";
import GetStarted from "./components/landing/GetStarted";
import AdminDashboard from "./components/admin/dashboard/AdminDashboard";
import ChatInterface from "./components/chat/ChatInterface";
import EmployeeChatInterface from "./components/chat/EmployeeChatInterface";
import TaskAllocationPage from "./components/admin/adminTaskAllocation/TaskAllocationPage";
import Invoices from "./components/admin/invoices/Invoices";
import Employees from "./components/admin/employees/Employees";
import Customers from "./components/admin/customers/Customers";
import AppointmentsByStatus from "./components/admin/appointments/AppointmentsByStatus";
import Dashboard from "./components/superAdmin/dashboard/Dashboard";
import { Chatbot } from "./components/chat/Chatbot";
import Users from "./components/superAdmin/users/Users";
import { MyAppoiment } from "./components/customer/MyAppoiment";
import Employee from "./components/employee/Employee";
import VehicleRepairs from "./components/landing/VehicleRepairs";

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <Routes>
            {/* Landing page */}
            <Route
              path="/"
              element={
                <>
                  <Navbar />
                  <Hero />
                  <AboutSection />
                  <WhyChooseUs />
                  <LeadershipTeam />
                  <Certificate />
                  <GetStarted />
                  <Footer />
                </>
              }
            />

            {/* Auth */}
            <Route path="/login" element={<AuthContainer />} />
            <Route path="/signup" element={<AuthContainer />} />
            <Route 
              path="/my-appointment" 
              element={
                <ProtectedRoute allowedRoles={["CUSTOMER"]}>
                  <MyAppoiment />
                </ProtectedRoute>
              }
            />
            <Route
              path="/booking"
              element={
                <ProtectedRoute allowedRoles={["CUSTOMER"]}>
                  <BookingAppointment />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="users" element={<Users />} />
            </Route>

            {/* Admin Routes */}
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route path="task-allocation" element={<TaskAllocationPage />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="appointments/:status" element={<AppointmentsByStatus />} />
            </Route>

            {/* Employee Routes */}
            <Route
              path="/employee/*"
              element={
                <ProtectedRoute allowedRoles={["EMPLOYEE"]}>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<Employee />} />
              <Route 
                path="messages" 
                element={
                  <ChatProvider>
                    <EmployeeChatInterface />
                  </ChatProvider>
                } 
              />
              <Route index element={<Navigate to="dashboard" replace />} />
            </Route>

            {/* Customer Routes */}
            <Route
              path="/customer/*"
              element={
                <ProtectedRoute allowedRoles={["CUSTOMER"]}>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route path="booking" element={<BookingAppointment />} />
            </Route>

            {/* Super Admin */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />

            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="appointments/:status" element={<AppointmentsByStatus />} />
            <Route path="employees" element={<Employees />} />
            <Route path="customers" element={<Customers />} />
            <Route path="invoices" element={<Invoices />} />
          </Route>
            {/* Admin */}
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
              <Route
                path="appointments/:status"
                element={<AppointmentsByStatus />}
              />
              <Route index element={<Navigate to="dashboard" replace />} />
            </Route>

            {/* Employee */}
            <Route
              path="/employee"
              element={
                <ProtectedRoute allowedRoles={["EMPLOYEE"]}>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<Employee />} />
              <Route
                path="messages"
                element={
                  <ChatProvider>
                    <EmployeeChatInterface />
                  </ChatProvider>
                }
              />
              <Route index element={<Navigate to="dashboard" replace />} />
            </Route>

            {/* Chat */}
            <Route
              path="/chat"
              element={
                <ProtectedRoute allowedRoles={["CUSTOMER", "EMPLOYEE"]}>
                  <ChatProvider>
                    <ChatInterface />
                  </ChatProvider>
                </ProtectedRoute>
              }
            />
          </Routes>

          {/* Global Chatbot */}
          <Chatbot />
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;