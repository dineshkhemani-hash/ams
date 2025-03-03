import React, { useState } from "react";
import { z } from "zod";
import { Eye, EyeOff, LogIn } from "lucide-react";
import ErrorPopup from "../components/ErrorPopup";
import { useNavigate } from "react-router";
import { useMutation, useQuery } from "@tanstack/react-query";

import { checkSession, loginUser } from "../api";
import LoginForm from "./AuthForm";
import LoadingSpinner from "../components/LoadingSpinner";
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
  const { data, isLoading, isError } = useQuery({
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
        if (data.data.roleName.toLowerCase() == "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/dashboard");
        }
      }
    },
    onError: (error: any) => {
      console.log(error);
      setError(error.response?.data?.message || error.message);
    },
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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

  return (
    <div>
      {isLoading ? (
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-indigo-800 flex items-center justify-center">
          <LoadingSpinner size="large" />
          {/* <div className="text-white text-xl">Loading...</div> */}
        </div>
      ) : isError ? (
        <LoginForm />
      ) : (
        <>
          {data?.status === "SUCCESS" ? (
            <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center p-4">
              <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-8">
                <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
                  Error
                </h2>
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
          ) : (
            <LoginForm />
          )}
        </>
      )}
    </div>
  );
  // const SlowComponent: React.FC = () => {
  //     // Artificially slow down the component
  //     const startTime = performance.now();
  //     while (performance.now() - startTime < 100) {
  //         // Slow down for 100ms
  //     }

  //     console.log('SlowComponent rendered'); // To track renders

  //     return (
  //         <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg mt-4">
  //             <h3 className="text-gray-700 dark:text-gray-200">
  //                 I am a slow component
  //             </h3>
  //             <p className="text-gray-600 dark:text-gray-300">
  //                 {new Date().toLocaleTimeString()}
  //             </p>
  //         </div>
  //     );
  // };
  // return (
  //     <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center p-4">
  //         <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-8">
  //             <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
  //                 Welcome Back
  //             </h2>

  //             <form onSubmit={handleSubmit} className="space-y-6">

  //                 <div>
  //                     <label className="block text-sm font-medium text-gray-700 mb-1">
  //                         Email Address
  //                     </label>
  //                     <input
  //                         type="email"
  //                         name="email"
  //                         value={formData.email}
  //                         onChange={handleChange}
  //                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
  //                         placeholder="you@example.com"
  //                     />
  //                 </div>

  //                 <div>
  //                     <label className="block text-sm font-medium text-gray-700 mb-1">
  //                         Password
  //                     </label>
  //                     <div className="relative">
  //                         <input
  //                             type={showPassword ? 'text' : 'password'}
  //                             name="password"
  //                             value={formData.password}
  //                             onChange={handleChange}
  //                             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
  //                             placeholder="••••••••"
  //                         />
  //                         <button
  //                             type="button"
  //                             onClick={() => setShowPassword(!showPassword)}
  //                             className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
  //                         >
  //                             {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
  //                         </button>
  //                     </div>
  //                 </div>

  //                 <button
  //                     type="submit"
  //                     className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-200 transition flex items-center justify-center gap-2"
  //                 >

  //                     <LogIn size={20} />
  //                     {loginMutation.isPending ? "Logging in..." : "Log in"}

  //                 </button>
  //             </form>

  //             <div className="mt-6 text-center">
  //                 <button
  //                     onClick={() => navigate("/signup")}
  //                     className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
  //                 >

  //                     Don't have an account? Sign up

  //                 </button>
  //             </div>
  //         </div>

  //         {error && (
  //             <ErrorPopup
  //                 message={error}
  //                 onClose={() => setError(null)}
  //                 position={{
  //                     top: '20px',
  //                     right: '20px'
  //                 }}
  //             />
  //         )}
  //     </div>

  // );
};

export default Login;

// import React, { useState } from 'react';
// import { z } from 'zod';
// import { Eye, EyeOff, LogIn, Clock, UserCheck } from 'lucide-react';
// import { motion } from 'framer-motion';
// import ErrorPopup from '../components/ErrorPopup';
// import { useNavigate } from 'react-router';
// import { useMutation, useQuery } from '@tanstack/react-query';
// import { checkSession, loginUser } from '../api';

// const userSchema = z.object({
//     email: z.string().email('Invalid email address'),
//     password: z.string().min(8, 'Password must be at least 8 characters'),
// });

// const LoginForm: React.FC = () => {
//     const navigate = useNavigate();
//     const [showPassword, setShowPassword] = useState(false);
//     const [error, setError] = useState<string | null>(null);
//     const [formData, setFormData] = useState({
//         email: '',
//         password: '',
//     });

//     const { data, isLoading, isError } = useQuery({
//         queryKey: ["session"],
//         queryFn: checkSession,
//         refetchOnWindowFocus: false,
//         retry: 1,
//     });

//     const loginMutation = useMutation({
//         mutationFn: loginUser,
//         onSuccess: (data) => {
//             if (data.status.toLowerCase() === "success") {
//                 if (data.data.roleName.toLowerCase() === "admin") {
//                     navigate("/admin-dashboard");
//                 } else {
//                     navigate("/dashboard");
//                 }
//             }
//         },
//         onError: (error: any) => {
//             setError(error.response?.data?.message || error.message);
//         }
//     });

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         try {
//             userSchema.parse(formData);
//             loginMutation.mutate(formData);
//         } catch (err) {
//             if (err instanceof z.ZodError) {
//                 setError(err.errors[0].message);
//             }
//         }
//     };

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setFormData(prev => ({
//             ...prev,
//             [e.target.name]: e.target.value
//         }));
//     };

//     if (isLoading) {
//         return (
//             <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-indigo-800 flex items-center justify-center">
//                 <motion.div
//                     initial={{ scale: 0.8, opacity: 0 }}
//                     animate={{ scale: 1, opacity: 1 }}
//                     className="text-white text-xl"
//                 >
//                     Loading...
//                 </motion.div>
//             </div>
//         );
//     }

//     if (data?.status === "SUCCESS") {
//         return (
//             <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-indigo-800 flex items-center justify-center p-4">
//                 <motion.div
//                     initial={{ y: 20, opacity: 0 }}
//                     animate={{ y: 0, opacity: 1 }}
//                     className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl w-full max-w-md p-8"
//                 >
//                     <h2 className="text-3xl font-bold text-center mb-8 text-white">
//                         Already Logged In
//                     </h2>
//                     <p className="text-center text-indigo-200 my-10">You are already logged in</p>
//                     <motion.button
//                         whileHover={{ scale: 1.02 }}
//                         whileTap={{ scale: 0.98 }}
//                         onClick={() => navigate("/dashboard")}
//                         className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-500 transition font-semibold"
//                     >
//                         Go to Dashboard
//                     </motion.button>
//                 </motion.div>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-indigo-800 flex items-center justify-center p-4">
//             <div className="absolute inset-0 overflow-hidden">
//                 <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1554774853-719586f82d77?ixlib=rb-4.0.3')] bg-cover bg-center opacity-5"></div>
//             </div>

//             <div className="absolute top-10 left-1/2 transform -translate-x-1/2 flex gap-8">
//                 <motion.div
//                     initial={{ y: -20, opacity: 0 }}
//                     animate={{ y: 0, opacity: 1 }}
//                     transition={{ delay: 0.2 }}
//                     className="flex items-center gap-2 text-indigo-200"
//                 >
//                     <Clock className="w-5 h-5" />
//                     <span>Track Time</span>
//                 </motion.div>
//                 <motion.div
//                     initial={{ y: -20, opacity: 0 }}
//                     animate={{ y: 0, opacity: 1 }}
//                     transition={{ delay: 0.4 }}
//                     className="flex items-center gap-2 text-indigo-200"
//                 >
//                     <UserCheck className="w-5 h-5" />
//                     <span>Manage Attendance</span>
//                 </motion.div>
//             </div>

//             <motion.div
//                 initial={{ y: 20, opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 transition={{ duration: 0.5 }}
//                 className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl w-full max-w-md p-8 relative z-10"
//             >
//                 <motion.h2
//                     initial={{ y: -20, opacity: 0 }}
//                     animate={{ y: 0, opacity: 1 }}
//                     transition={{ delay: 0.2 }}
//                     className="text-3xl font-bold text-center mb-8 text-white"
//                 >
//                     Welcome Back
//                 </motion.h2>

//                 <form onSubmit={handleSubmit} className="space-y-6">
//                     <motion.div
//                         initial={{ x: -20, opacity: 0 }}
//                         animate={{ x: 0, opacity: 1 }}
//                         transition={{ delay: 0.3 }}
//                     >
//                         <label className="block text-sm font-medium text-indigo-200 mb-1">
//                             Email Address
//                         </label>
//                         <input
//                             type="email"
//                             name="email"
//                             value={formData.email}
//                             onChange={handleChange}
//                             className="w-full px-4 py-3 bg-indigo-950/50 border border-indigo-700/30 text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition placeholder-indigo-400/30"
//                             placeholder="you@example.com"
//                         />
//                     </motion.div>

//                     <motion.div
//                         initial={{ x: -20, opacity: 0 }}
//                         animate={{ x: 0, opacity: 1 }}
//                         transition={{ delay: 0.4 }}
//                     >
//                         <label className="block text-sm font-medium text-indigo-200 mb-1">
//                             Password
//                         </label>
//                         <div className="relative">
//                             <input
//                                 type={showPassword ? 'text' : 'password'}
//                                 name="password"
//                                 value={formData.password}
//                                 onChange={handleChange}
//                                 className="w-full px-4 py-3 bg-indigo-950/50 border border-indigo-700/30 text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition placeholder-indigo-400/30"
//                                 placeholder="••••••••"
//                             />
//                             <button
//                                 type="button"
//                                 onClick={() => setShowPassword(!showPassword)}
//                                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-indigo-300 hover:text-white transition"
//                             >
//                                 {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                             </button>
//                         </div>
//                     </motion.div>

//                     <motion.button
//                         type="submit"
//                         whileHover={{ scale: 1.02 }}
//                         whileTap={{ scale: 0.98 }}
//                         initial={{ y: 20, opacity: 0 }}
//                         animate={{ y: 0, opacity: 1 }}
//                         transition={{ delay: 0.5 }}
//                         className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-500 transition flex items-center justify-center gap-2 font-semibold"
//                     >
//                         <LogIn size={20} />
//                         {loginMutation.isPending ? "Logging in..." : "Log in"}
//                     </motion.button>
//                 </form>

//                 <motion.div
//                     initial={{ y: 20, opacity: 0 }}
//                     animate={{ y: 0, opacity: 1 }}
//                     transition={{ delay: 0.6 }}
//                     className="mt-6 text-center"
//                 >
//                     <button
//                         onClick={() => navigate("/signup")}
//                         className="text-indigo-300 hover:text-white text-sm font-medium transition"
//                     >
//                         Don't have an account? Sign up
//                     </button>
//                 </motion.div>
//             </motion.div>

//             {error && (
//                 <ErrorPopup
//                     message={error}
//                     onClose={() => setError(null)}
//                     position={{
//                         top: '20px',
//                         right: '20px'
//                     }}
//                 />
//             )}
//         </div>
//     );
// };

// export default LoginForm;
