import { ArrowLeft, Home, Search } from "lucide-react";
import { useNavigate } from "react-router";

const NotFoundPageCreated: React.FC = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };
  const handleGoHome = () => {
    navigate("/");
  };
  return (
    <div className="bg-indigo-500 min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-950  flex flex-col justify-center items-center mx-0 my-auto">
      <div className="max-w-lg w-full">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="bg-indigo-100 dark:bg-indigo-900/30 w-32 h-32 rounded-full flex items-center justify-center">
              <Search className="h-16 w-16 text-indigo-500 dark:text-indigo-400" />
            </div>
            <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full flex items-center justify-center shadow-lg bg-white dark:bg-gray-800">
              <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 ">
                ?
              </span>
            </div>
          </div>
        </div>
        <div className="text-center mb-8">
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
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className=" cursor-pointer inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-xl text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600  focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 transition-colors">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Go Back
            </button>
            <button className="cursor-pointer inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 transition-colors">
              <Home className="h-5 w-5 mr-2" />
              Go Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NotFoundPageCreated;
