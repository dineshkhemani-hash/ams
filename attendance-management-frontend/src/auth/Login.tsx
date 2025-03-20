import React, { useEffect, useState } from "react";
import { z } from "zod";
import { Eye, EyeOff, LogIn } from "lucide-react";
import ErrorPopup from "../components/ErrorPopup";
import { useNavigate } from "react-router";
import { useMutation, useQuery } from "@tanstack/react-query";

import { checkSession, loginUser } from "../api";
import LoginForm from "./AuthForm";
import LoadingSpinner from "../components/LoadingSpinner";
import ThemeToggle from "../components/ThemeToggle";
const userSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const {
    data: session,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["session"],
    queryFn: checkSession,
    refetchOnWindowFocus: false,
    retry: 1,
  });
  //uncomment line this and u will get  Rendered fewer hooks than expected. This may be caused by an accidental early return statement.
  //because react relies on order and number of hooks being consistent across renders to manage their state correctly.
  // if (isError) return <div>Not logged in.. <button onClick={() => navigate("/login")}>Click here</button></div>
  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log(data.status.toLowerCase());
      if (data.status.toLowerCase() === "success") {
        // if (data.data.roleName.toLowerCase() == "admin") {
        //   navigate("/admin-dashboard");
        // } else {
        //   navigate("/dashboard");
        // }
        navigate(
          data.data.roleName.toLowerCase() === "admin"
            ? "/admin-dashboard"
            : "/dashboard"
        );
      }
    },
    onError: (error: any) => {
      console.log(error);
      setError(error.response?.data?.message || error.message);
    },
  });

  useEffect(() => {
    if (session?.status === "SUCCESS") {
      navigate("/dashboard", { replace: true });
    }
  }, [session, navigate]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const dataToValidate = formData;
      // { email: formData.email, password: formData.password }
      userSchema.parse(dataToValidate);
      // Here you would typically make an API call to your backend
      // try {
      //     const response = await axios.post(`${import.meta.env.VITE_API_URL}api/v1/auth/login`, formData, { withCredentials: true });
      //     console.log(response.data.status == "SUCCESS");
      //     if (response.data.status == "SUCCESS") {
      //         navigate("/dashboard", { replace: true })
      //     } else {
      //         alert(response.data.message);
      //     }
      // } catch (error) {
      //     alert(error.response?.data?.message);
      // }
      loginMutation.mutate(formData);
      console.log("Form submitted:", formData);
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      }
    }
  };
  if (session?.status === "SUCCESS") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-8">
          <p className="text-center text-red-500 my-10">
            You are already logged in
          </p>
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-indigo-800 flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  // if (isError) {
  //   return (
  //     <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-950 flex items-center justify-center p-4">
  //       <div className="absolute top-4 right-4">
  //         <ThemeToggle />
  //       </div>
  //       {error ? (
  //         <ErrorPopup
  //           message={error}
  //           onClose={() => setError(null)}
  //           position={{
  //             top: "20px",
  //             right: "20px",
  //           }}
  //         />
  //       ) : (
  //         <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md p-8">
  //           <div className="flex justify-center mb-6">
  //             <div className="w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
  //               <LogIn className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
  //             </div>
  //           </div>
  //           <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100 font-display">
  //             Welcome Back
  //           </h2>
  //           <form onSubmit={handleSubmit} className="space-y-6">
  //             <div>
  //               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
  //                 Email Address
  //               </label>
  //               <input
  //                 type="email"
  //                 name="email"
  //                 value={formData.email}
  //                 onChange={handleChange}
  //                 className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
  //                 placeholder="you@example.com"
  //                 required
  //               />
  //             </div>
  //             <div>
  //               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
  //                 Password
  //               </label>
  //               <div className="relative">
  //                 <input
  //                   type={showPassword ? "text" : "password"}
  //                   name="password"
  //                   value={formData.password}
  //                   onChange={handleChange}
  //                   className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
  //                   placeholder="••••••••"
  //                   required
  //                 />
  //                 <button
  //                   type="button"
  //                   onClick={() => setShowPassword(!showPassword)}
  //                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700"
  //                 >
  //                   {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
  //                 </button>
  //               </div>
  //             </div>
  //             <button
  //               type="submit"
  //               disabled={isLoading}
  //               className={`w-full bg-indigo-600 dark:bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 focus:ring-4 focus:ring-indigo-200 dark:focus:ring-indigo-800 transition flex items-center justify-center gap-2 ${
  //                 isLoading ? "opacity-70 cursor-not-allowed" : ""
  //               }`}
  //             >
  //               <LogIn size={20} />
  //               {isLoading ? "Logging in..." : "Log in"}
  //             </button>
  //           </form>
  //           <div className="mt-6 text-center">
  //             <button
  //               onClick={() => navigate("/signup")}
  //               className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 text-sm font-medium"
  //             >
  //               Don't have an account? Sign up
  //             </button>
  //           </div>
  //         </div>
  //       )}
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-950 flex items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      {error ? (
        <ErrorPopup
          message={error}
          onClose={() => setError(null)}
          position={{ top: "20px", right: "20px" }}
        />
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md p-8">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
              <LogIn className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100 font-display">
            Welcome Back
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-indigo-600 dark:bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 focus:ring-4 focus:ring-indigo-200 dark:focus:ring-indigo-800 transition flex items-center justify-center gap-2 ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              <LogIn size={20} />
              {isLoading ? "Logging in..." : "Log in"}
            </button>
          </form>
          <div className="mt-6 text-center">
            <button
              onClick={() => navigate("/signup")}
              className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 text-sm font-medium"
            >
              Don't have an account? Sign up
            </button>
          </div>
        </div>
      )}
    </div>
  );
  // return (
  //   <div>
  //     {isLoading ? (
  //       <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-indigo-800 flex items-center justify-center">
  //         <LoadingSpinner size="large" />
  //         {/* <div className="text-white text-xl">Loading...</div> */}
  //       </div>
  //     ) : isError ? (
  //       <LoginForm />
  //     ) : (
  //       <>
  //         {data?.status === "SUCCESS" ? (
  //           <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center p-4">
  //             <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-8">
  //               <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
  //                 Error
  //               </h2>
  //               <p className="text-center text-red-500 my-10">
  //                 You are already logged in
  //               </p>
  //               <button
  //                 onClick={() => navigate("/dashboard")}
  //                 className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
  //               >
  //                 Go to Dashboard
  //               </button>
  //             </div>
  //           </div>
  //         ) : (
  //           <LoginForm />
  //         )}
  //       </>
  //     )}
  //   </div>
  // );
};
export default Login;
