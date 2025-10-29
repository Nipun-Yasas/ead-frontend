import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import AuthContainer from "./components/auth/AuthContainer";
import AboutSection from "./components/aboutSection/AboutSection";
import BookingAppointment from "./components/BookingAppointment";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import DashboardLayout from "./components/layouts/DashboardLayout";
import GetStarted from "./components/main/GetStarted";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<><GetStarted /><AboutSection /></>} />
          <Route path="/book" element={<BookingAppointment />} />
          <Route path="/login" element={<AuthContainer />} />
          <Route path="/signup" element={<AuthContainer />} />

          <Route
            path="/superadmin"
            element={
              <ProtectedRoute allowedRoles={['SUPER_ADMIN']}>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<div>Super Admin Dashboard</div>} />
            <Route path="users" element={<div>User Management</div>} />
            <Route path="inventory" element={<div>Inventory</div>} />
            <Route path="settings" element={<div>Settings</div>} />
            <Route index element={<Navigate to="dashboard" replace />} />
          </Route>

          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<div>Admin Dashboard</div>} />
            <Route path="users" element={<div>User Management</div>} />
            <Route path="inventory" element={<div>Inventory</div>} />
            <Route path="settings" element={<div>Settings</div>} />
            <Route index element={<Navigate to="dashboard" replace />} />
          </Route>

          <Route
            path="/employee"
            element={
              <ProtectedRoute allowedRoles={['EMPLOYEE']}>
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
              <ProtectedRoute allowedRoles={['CUSTOMER']}>
                <div>Customer Dashboard</div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;