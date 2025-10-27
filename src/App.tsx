import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import AuthContainer from "./components/auth/AuthContainer";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import DashboardLayout from "./components/layouts/DashboardLayout";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
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
            <Route path="shop" element={<div>Shop</div>} />
            <Route path="orders" element={<div>My Orders</div>} />
            <Route path="wishlist" element={<div>Wishlist</div>} />
            <Route path="profile" element={<div>Profile</div>} />
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