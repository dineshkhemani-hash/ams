import React, { useState } from "react";
import { z } from "zod";
import { Eye, EyeOff, Lock, UserPlus } from "lucide-react";
import ErrorPopup from "../components/ErrorPopup";
import { useNavigate } from "react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { checkSession, signupUser } from "../api";
import LoadingSpinner from "../components/LoadingSpinner";
import ThemeToggle from "../components/ThemeToggle";

const userSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(20, "Name should be within 20 characters"),
});

const SignupForm: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const { data, isLoading, isError } = useQuery({
    queryKey: ["session"],
    queryFn: checkSession,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const signupMutation = useMutation({
    mutationFn: signupUser,
    onSuccess: (data) => {
      if (data?.status.toLowerCase() === "success") navigate("/dashboard");
    },
    onError: (error) => {
      console.log(error);
      if (error.details) {
        setError(error.details);
      } else {
        setError({ message: error.message });
      }
    },
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const dataToValidate = formData;

      userSchema.parse(dataToValidate);

      // Here you would typically make an API call to your backend
      signupMutation.mutate(formData);
      console.log("Form submitted:", formData);
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div>
      {isLoading ? (
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-indigo-800 flex items-center justify-center">
          <LoadingSpinner size="large" />
          {/* <div className="text-white text-xl">Loading...</div> */}
        </div>
      ) : isError ? (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-950 flex items-center justify-center p-4">
          <div className="absolute top-4 right-4">
            <ThemeToggle />
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md p-8">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                <Lock className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100 font-display">
              Create Account
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700  dark:text-gray-300 mb-1">
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
                <label className="block text-sm font-medium text-gray-700  dark:text-gray-300 mb-1">
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
                <UserPlus size={20} />
                {isLoading ? "Creating account..." : "Create account"}
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => navigate("/login")}
                className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 text-sm font-medium"
              >
                Already have an account? Sign in
              </button>
            </div>
          </div>

          {error && (
            <ErrorPopup
              message={error}
              onClose={() => setError(null)}
              position={{
                top: "20px",
                right: "20px",
              }}
            />
          )}
        </div>
      ) : (
        <>
          <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-8">
              <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
                Error
              </h2>
              <p className="text-center text-red-500 my-10">
                Account Already Created
              </p>
              <button
                onClick={() => navigate("/dashboard")}
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SignupForm;
