import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';

const Error: React.FC = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const id = setTimeout(() => {
            navigate("/login", { replace: true })
        }, 1000);
        return () => {
            clearTimeout(id);
        }
    }, [])
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-8">
                <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Error</h2>
                <p className="text-center text-red-500 my-10">Some error occured. Navigating to login..</p>
                <button
                    onClick={() => navigate("/dashboard")}
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
                >
                    Go to Dashboard
                </button>
            </div>
        </div>
    );
};

export default Error;
