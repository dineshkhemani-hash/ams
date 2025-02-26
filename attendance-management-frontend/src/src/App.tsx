import "./App.css";

import SignupForm from "./auth/Signup.tsx";
import { Home } from "./homepage/Home.tsx";
import EmployeeDashboard from "./dashboard/EmployeeDashboard.tsx";
import AdminDashboard from "./dashboard/AdminDashboard.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import ProtectedRoute from "./auth/ProtectedRoute.tsx";
import Login from "./auth/Login.tsx";

import EmployeeDetailPage from "./dashboard/EmployeeDetail.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/" element={<Home />} />
        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <EmployeeDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard/employee/:id"
          element={
            <ProtectedRoute>
              <EmployeeDetailPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
