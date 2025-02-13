import React from 'react';
import { useNavigate, useLocation } from 'react-router';
import { LogOut, Calendar, Users } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout } from '../api';
import ThemeToggle from '../components/ThemeToggle';

interface LayoutProps {
    children: React.ReactNode;
    userRole: 'admin' | 'employee';
}

const Layout: React.FC<LayoutProps> = ({ children, userRole }) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const location = useLocation();
    const logoutMutation = useMutation({
        mutationFn: logout,
        onSuccess: (data) => {
            console.log(data);
            if (data.status.toLowerCase() === "success") {
                queryClient.invalidateQueries(["session"])
                queryClient.removeQueries(["session"])
                navigate("/login", { replace: true });
            }
        },
        onError: (error) => alert(error.message)
    })
    const handleLogout = () => {
        // Add logout logic here
        logoutMutation.mutate();
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center">
                                <Calendar className="h-8 w-8 text-indigo-600" />
                                <span className="ml-2 text-xl font-bold text-gray-800">
                                    Attendance Portal
                                </span>
                            </div>
                            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                                {userRole === 'admin' && (
                                    <button
                                        onClick={() => navigate('/admin/dashboard')}
                                        className={`${location.pathname.includes('/admin')
                                            ? 'border-indigo-500 text-gray-900'
                                            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                            } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                                    >
                                        <Users className="h-4 w-4 mr-2" />
                                        All Employees
                                    </button>
                                )}
                                <button
                                    onClick={() => navigate('/dashboard')}
                                    className={`${location.pathname === '/dashboard'
                                        ? 'border-indigo-500 text-gray-900'
                                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                        } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                                >
                                    <Calendar className="h-4 w-4 mr-2" />
                                    My Attendance
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <ThemeToggle />
                            <button
                                onClick={handleLogout}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                <LogOut className="h-4 w-4 mr-2" />
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">{children}</main>
        </div>
    );
};

export default Layout;