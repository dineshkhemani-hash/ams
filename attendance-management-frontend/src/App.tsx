import './App.css'
import LoginForm from './auth/Login.tsx'
import SignupForm from './auth/Signup.tsx'
import { Home } from './homepage/Home.tsx'
import EmployeeDashboard from './dashboard/EmployeeDashboard.tsx'
import AdminDashboard from './dashboard/AdminDashboard.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import ProtectedRoute from './auth/ProtectedRoute.tsx'
import { ThemeProvider } from './context/ThemeProvider.tsx'
function App() {

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<LoginForm />} />
          <Route path='/signup' element={<SignupForm />} />
          <Route path="/" element={<Home />} />
          {/* Protected Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <EmployeeDashboard />
            </ProtectedRoute>
          } />
          <Route path='/admin-dashboard' element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
