import React from "react";
import { useNavigate } from "react-router";

interface ErrorMessageProps {
  title?: string;
  message: string;
  buttonText?: string;
  redirectPath?: string;
  onButtonClick?: () => void;
  className?: string;
}

/**
 * A reusable error message component that can be used throughout the application
 */
const ErrorMessage: React.FC<ErrorMessageProps> = ({
  title = "Error",
  message,
  buttonText = "Go to Dashboard",
  redirectPath = "/dashboard",
  onButtonClick,
  className = "",
}) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (onButtonClick) {
      onButtonClick();
    } else if (redirectPath) {
      navigate(redirectPath);
    }
  };

  return (
    <div
      className={`min-w-full bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-950 flex items-center justify-center p-4 ${className}`}
    >
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md p-8">
        <h2 className="text-3xl font-bold text-center mb-8 p-4 text-gray-800 dark:text-gray-200">
          {title}
        </h2>
        <p className="text-center text-red-500 dark:text-red-400 my-10">
          {message}
        </p>
        <button
          onClick={handleButtonClick}
          className="justify-self-center m-auto w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 transition"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default ErrorMessage;
