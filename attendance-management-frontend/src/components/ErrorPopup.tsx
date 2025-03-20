import React from "react";
import { AlertTriangle, Home, RefreshCw, X } from "lucide-react";
import { useNavigate } from "react-router";

interface ErrorPopupProps {
  message: string;
  onClose: () => void;
  position?: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
}

const ErrorPopup: React.FC<ErrorPopupProps> = ({
  message,
  onClose,
  position,
}) => {
  const navigate = useNavigate();
  const positionStyles = position || {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    // if (resetError) {
    //   resetError(); // Reset the ErrorBoundary state first
    // }
    navigate("/", { replace: true });
    // window.location.reload();
  };
  return (
    // <div
    //     className="fixed z-50 bg-white rounded-lg shadow-xl p-4 border-l-4 border-red-500 min-w-[300px] dark:bg-gray-900"
    //     style={positionStyles}
    // >
    //     <div className="flex justify-between items-start">
    //         {typeof message === 'string' ? (

    //             <div className='flex-1'>
    //                 <h3 className="text-lg font-semibold text-red-600 mb-1">Error</h3>
    //                 <p className="text-gray-600">{message}</p>
    //             </div>

    //         ) : (
    //             <ul>
    //                 {Object.entries(message).map(([key, value]) => {
    //                     if (key == "message" || key == "timestamp" || key == "status") {

    //                     } else {
    //                         return (
    //                             <div className='flex-1'>
    //                                 <h3 className="text-lg font-semibold text-red-600 mb-1">Error</h3>
    //                                 <p className="text-gray-600">{value}</p>
    //                             </div>
    //                         )
    //                     }
    //                 })}
    //             </ul>
    //         )}
    //         <button
    //             onClick={onClose}
    //             className="text-gray-400 hover:text-gray-600 transition-colors"
    //         >
    //             <X size={20} />
    //         </button>
    //     </div>
    // </div>
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
            <AlertTriangle className="h-12 w-12 text-red-500 dark:text-red-400" />
          </div>
        </div>

        <h1 className="text-3xl font-bold font-display text-gray-900 dark:text-white mb-4">
          Something Went Wrong
        </h1>

        <p className="text-gray-600 dark:text-gray-300 mb-6">
          We're sorry, but we encountered an unexpected error. Our team has been
          notified and is working to fix the issue.
        </p>

        {/* {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg text-left">
            <p className="text-sm font-medium text-red-800 dark:text-red-300">
              Error details:
            </p>
            <p className="text-sm text-red-700 dark:text-red-400 font-mono mt-1 break-words">
              {error.message || "Unknown error"}
            </p>
          </div>
        )} */}
        {typeof message === "string" ? (
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-red-600 mb-1">Error</h3>
            <p className="text-gray-600 mb-2">{message}</p>
          </div>
        ) : (
          <ul>
            {Object.entries(message).map(([key, value]) => {
              if (key === "message") {
                return (
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-red-600 mb-2">
                      Error
                    </h3>
                    <p className="text-gray-600 mb-2">
                      {message["message"] || message["error"]}
                    </p>
                  </div>
                );
              } else if (key === "timestamp" || key === "status") {
              } else {
                // return (
                //   <div className="flex-1">
                //     <h3 className="text-lg font-semibold text-red-600 mb-1">
                //       Error
                //     </h3>
                //     <p className="text-gray-600 mb-2">{value}</p>
                //   </div>
                // );
              }
            })}
          </ul>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleRefresh}
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 transition-colors"
          >
            <RefreshCw className="h-5 w-5 mr-2" />
            Try Again
          </button>

          <button
            onClick={handleGoHome}
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-xl text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 transition-colors"
          >
            <Home className="h-5 w-5 mr-2" />
            Go Home
          </button>
        </div>

        {/* <div className="mt-8 relative">
          <img
            src="https://images.unsplash.com/photo-1555861496-0666c8981751?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
            alt="Error illustration"
            className="w-full h-auto rounded-xl object-cover shadow-md"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-xl"></div>
        </div> */}
      </div>
    </div>
  );
};

export default ErrorPopup;
