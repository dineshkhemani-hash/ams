import React from "react";

import { Clock, Users, BarChart, Shield, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";

export const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm fixed w-full z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                AttendanceHub
              </span>
            </div>
            <button
              onClick={() => navigate("/login")}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              Sign In
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-24 pb-16 sm:pt-32 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight mb-6">
              Streamline Your Attendance Management
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              A modern solution for tracking employee attendance, managing work
              hours, and generating insightful reports.
            </p>
            <button
              onClick={() => navigate("/login")}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="relative p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Time Tracking
              </h3>
              <p className="text-gray-600">
                Easily record daily attendance with check-in and check-out
                times. Monitor work hours effortlessly.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="relative p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Employee Management
              </h3>
              <p className="text-gray-600">
                Comprehensive employee database with role-based access control
                and user management.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="relative p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart className="h-6 w-6 text-pink-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Analytics & Reports
              </h3>
              <p className="text-gray-600">
                Generate detailed attendance reports and analyze employee
                attendance patterns.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Features Section */}
      <div className="py-16 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Powerful Admin Controls
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything administrators need to manage attendance effectively
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Complete Control
                  </h3>
                  <ul className="text-gray-600 space-y-2">
                    <li className="flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2 text-green-500" />
                      Manage employee accounts and access levels
                    </li>
                    <li className="flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2 text-green-500" />
                      Monitor attendance in real-time
                    </li>
                    <li className="flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2 text-green-500" />
                      Generate comprehensive reports
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <BarChart className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Detailed Analytics
                  </h3>
                  <ul className="text-gray-600 space-y-2">
                    <li className="flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2 text-blue-500" />
                      Track attendance patterns
                    </li>
                    <li className="flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2 text-blue-500" />
                      Monitor working hours
                    </li>
                    <li className="flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2 text-blue-500" />
                      Analyze employee performance
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Clock className="h-6 w-6 text-indigo-600" />
              <span className="ml-2 text-lg font-semibold text-gray-900">
                AttendanceHub
              </span>
            </div>
            <p className="text-gray-500 text-sm">
              © 2024 AttendanceHub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
