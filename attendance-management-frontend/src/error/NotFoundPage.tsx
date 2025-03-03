import React from "react";
import { useNavigate } from "react-router";
import { Search, ArrowLeft, Home } from "lucide-react";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-950 flex items-center justify-center p-4">
      <div className="max-w-lg w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                <Search className="h-16 w-16 text-indigo-500 dark:text-indigo-400" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-lg">
                <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                  ?
                </span>
              </div>
            </div>
          </div>

          <h1 className="text-6xl font-bold font-display text-gray-900 dark:text-white mb-4">
            404
          </h1>

          <h2 className="text-2xl font-semibold font-display text-gray-800 dark:text-gray-100 mb-4">
            Page Not Found
          </h2>

          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleGoBack}
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-xl text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Go Back
            </button>

            <button
              onClick={handleGoHome}
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 transition-colors"
            >
              <Home className="h-5 w-5 mr-2" />
              Go Home
            </button>
          </div>
        </div>

        {/* <div className="relative rounded-2xl overflow-hidden shadow-xl">
          <img
            src="https://images.unsplash.com/photo-1584824486509-112e4181ff6b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
            alt="Lost in space illustration"
            className="w-full h-auto object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <p className="text-lg font-medium drop-shadow-md">
              Lost in the digital space? Let's get you back on track.
            </p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default NotFoundPage;
