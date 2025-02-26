import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router'
import { ThemeProvider } from './context/ThemeProvider.tsx'
import { AuthProvider } from './context/AuthContext.tsx'


//step 1 for Routing create a new Browser Router this is the old approach 
// const router = createBrowserRouter([
//   { path: "/", element: <AuthForm /> },
//   {
//     path: "/login", element: <LoginForm />
//   },
//   {
//     path: "/signup", element: <SignupForm />
//   },
//   { path: "/home", element: <Home /> },
//   {
//     path: "/dashboard", element: <EmployeeDashboard />
//   },
//   {
//     path: "/admin/dashboard", element: <AdminDashboard />
//   },
//   {
//     path: "*", element: <Navigate to="/" replace />
//   }

// ])
//step 1 create a client of react query
const queryClient = new QueryClient();
createRoot(document.getElementById('root')!).render(
  <StrictMode>

    <ThemeProvider>
      {/* Step 2 add RouterProvider which accept router which can be any type like memoryrouter also but mostly browser router preferred */}
      {/* step 2 add QueryClientProvider which accept client which is instance of QueryClient */}
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          {/* Old approach router */}
          {/* <RouterProvider router={router} /> */}
          <App />
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>

  </StrictMode>,
)
