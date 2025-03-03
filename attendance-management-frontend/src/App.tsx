import "./App.css";

import SignupForm from "./auth/Signup.tsx";
import { Home } from "./homepage/Home.tsx";
import EmployeeDashboard from "./dashboard/EmployeeDashboard.tsx";
import AdminDashboard from "./dashboard/AdminDashboard.tsx";
import { BrowserRouter, Route, Routes, useLocation } from "react-router";
import ProtectedRoute from "./auth/ProtectedRoute.tsx";
import Login from "./auth/Login.tsx";

import EmployeeDetailPage from "./dashboard/EmployeeDetail.tsx";
import NotFoundPage from "./error/NotFoundPage.tsx";
import NotFoundPageCreated from "./error/NotFoundPageCreated.tsx";
import ErrorBoundary from "./error/ErrorBoundary.tsx";
import ErrorComponentExample from "./error/ErrorComponentExample.tsx";
import { ThemeProvider } from "./context/ThemeProvider.tsx";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <ErrorBoundary>
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
            <Route path="/404" element={<NotFoundPage />} />
            <Route path="*" element={<NotFoundPageCreated />} />
            <Route path="/error-example" element={<ErrorComponentExample />} />
          </Routes>
        </ErrorBoundary>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
