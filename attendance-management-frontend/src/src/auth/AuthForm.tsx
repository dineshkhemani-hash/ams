import { useState } from "react";
import ErrorPopup from "../components/ErrorPopup";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../api";
import { useNavigate } from "react-router";
import { z } from "zod";
import { Eye, EyeOff, LogIn } from "lucide-react";
const userSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});
const LoginForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setIsLoading(false);
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
      setIsLoading(false);
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
    setIsLoading(true);
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
      setIsLoading(false);
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      }
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Welcome Back
        </h2>

        {/* <form onSubmit={handleSubmit} className="space-y-6">

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-200 transition flex items-center justify-center gap-2"
                    >


                        <LogIn size={20} />
                        {loginMutation.isPending ? "Logging in..." : "Log in"}


                    </button>
                </form> */}
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="/forgot-password"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>

            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <a
                  href="/signup"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Sign up
                </a>
              </p>
            </div>
          </div>
        </form>
        {/* <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/signup")}
            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium cursor-pointer"
          >
            Don't have an account? Sign up
          </button>
        </div> */}
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
  );
};
export default LoginForm;
