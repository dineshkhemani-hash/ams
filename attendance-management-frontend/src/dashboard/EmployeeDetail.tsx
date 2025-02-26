import React, { useState } from "react";
import { useParams } from "react-router";
import { format } from "date-fns";
import {
  Download,
  ChevronDown,
  Clock,
  LogIn,
  LogOut,
  Award,
} from "lucide-react";

import { User, AttendanceRecord, EmployeeDetail } from "../types";
import Layout from "./Layout";
import AttendanceHistory from "../components/AttendanceHistory";
import AttendanceCalendar from "../components/AttendanceCalender";

const EmployeeDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Mock data - replace with API call
  const employee: EmployeeDetail = {
    id: "1",
    name: "John Anderson",
    email: "john.anderson@example.com",
    role: "employee",
    position: "Senior Developer",
    phone: "+1 (555) 123-4567",
    imageUrl: null,
  };

  const attendanceRecords: AttendanceRecord[] = [
    {
      id: "1",
      userId: "1",
      name: "John Anderson",
      attendanceDate: "2024-03-01",
      in_time: "09:00",
      out_time: "17:30",
      duration: "8.5",
      status: "present",
    },
    // Add more mock records as needed
  ];

  const stats = {
    totalAttendance: 309,
    avgCheckIn: "08:46",
    avgCheckOut: "17:04",
    performanceScore: "Role Model",
  };
  //   const attendanceRecords: AttendanceRecord[] = [
  //     {
  //       id: "1",
  //       userId: "1",
  //       userName: "John Anderson",
  //       date: "2024-03-08",
  //       inTime: "08:53",
  //       outTime: "17:15",
  //       totalHours: 8.5,
  //       status: "present",
  //     },
  //     {
  //       id: "2",
  //       userId: "1",
  //       userName: "John Anderson",
  //       date: "2024-03-07",
  //       inTime: "08:27",
  //       outTime: "17:09",
  //       totalHours: 8.7,
  //       status: "late",
  //     },
  //     {
  //       id: "3",
  //       userId: "1",
  //       userName: "John Anderson",
  //       date: "2024-03-06",
  //       inTime: null,
  //       outTime: null,
  //       totalHours: 0,
  //       status: "absent",
  //     },
  //     {
  //       id: "4",
  //       userId: "1",
  //       userName: "John Anderson",
  //       date: "2024-03-05",
  //       inTime: "08:55",
  //       outTime: "17:10",
  //       totalHours: 8.25,
  //       status: "present",
  //     },
  //     {
  //       id: "5",
  //       userId: "1",
  //       userName: "John Anderson",
  //       date: "2024-03-04",
  //       inTime: "08:58",
  //       outTime: "17:06",
  //       totalHours: 8.13,
  //       status: "present",
  //     },
  //     {
  //       id: "6",
  //       userId: "1",
  //       userName: "John Anderson",
  //       date: "2024-03-03",
  //       inTime: "08:40",
  //       outTime: "17:02",
  //       totalHours: 8.37,
  //       status: "late",
  //     },
  //   ];

  return (
    <Layout userRole="admin">
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Employee Header Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
          <div className="flex justify-between items-start mb-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              Employee Details
            </h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  This Year
                  <ChevronDown className="ml-2 h-4 w-4" />
                </button>
              </div>
              <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <Download className="h-4 w-4 mr-2" />
                Download Info
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="relative">
              {employee.imageUrl ? (
                <img
                  src={employee.imageUrl}
                  alt={employee.name}
                  className="w-24 h-24 rounded-full object-cover"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
                  {employee.name.charAt(0)}
                </div>
              )}
            </div>

            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {employee.name}
              </h2>
              <div className="mt-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Role
                  </p>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {employee.position}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Phone Number
                  </p>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {employee.phone}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Email Address
                  </p>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {employee.email}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                <div className="ml-3">
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {stats.totalAttendance}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Total Attendance
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <div className="flex items-center">
                <LogIn className="h-5 w-5 text-green-600 dark:text-green-400" />
                <div className="ml-3">
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {stats.avgCheckIn}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Avg Check In Time
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <div className="flex items-center">
                <LogOut className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                <div className="ml-3">
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {stats.avgCheckOut}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Avg Check Out Time
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <div className="flex items-center">
                <Award className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                <div className="ml-3">
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {stats.performanceScore}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Employee Predicate
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Attendance History */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
            <AttendanceHistory records={attendanceRecords} />
          </div>

          {/* Calendar */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
              Calendar View
            </h2>
            <AttendanceCalendar
              attendanceRecords={attendanceRecords}
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EmployeeDetailPage;

// import React, { useState } from "react";
// import { useParams } from "react-router";
// import {
//   format,
//   startOfMonth,
//   endOfMonth,
//   eachDayOfInterval,
//   isSameMonth,
//   isSameDay,
// } from "date-fns";
// import {
//   Download,
//   ChevronDown,
//   Clock,
//   LogIn,
//   LogOut,
//   Award,
// } from "lucide-react";

// import { AttendanceRecord, EmployeeDetail } from "../types";
// import AttendanceCalendar from "../components/AttendanceCalender";
// import Layout from "./Layout";

// const EmployeeDetailPage: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const [selectedDate, setSelectedDate] = useState(new Date());

//   // Mock data - replace with API call
//   const employee: EmployeeDetail = {
//     id: "1",
//     name: "John Anderson",
//     email: "john.anderson@example.com",
//     role: "employee",
//     position: "Senior Developer",
//     phone: "+1 (555) 123-4567",
//     imageUrl: null,
//   };

//   const attendanceRecords: AttendanceRecord[] = [
//     {
//       id: "1",
//       userId: "1",
//       name: "John Anderson",
//       attendanceDate: "2024-03-01",
//       in_time: "09:00",
//       out_time: "17:30",
//       duration: "8.5",
//       status: "present",
//     },
//     // Add more mock records as needed
//   ];

//   const stats = {
//     totalAttendance: 309,
//     avgCheckIn: "08:46",
//     avgCheckOut: "17:04",
//     performanceScore: "Role Model",
//   };

//   return (
//     <Layout userRole="admin">
//       <div className="space-y-6 max-w-7xl mx-auto">
//         {/* Employee Header Card */}
//         <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
//           <div className="flex justify-between items-start mb-6">
//             <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
//               Employee Details
//             </h1>
//             <div className="flex items-center space-x-4">
//               <div className="relative">
//                 <button className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
//                   This Year
//                   <ChevronDown className="ml-2 h-4 w-4" />
//                 </button>
//               </div>
//               <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
//                 <Download className="h-4 w-4 mr-2" />
//                 Download Info
//               </button>
//             </div>
//           </div>

//           <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
//             <div className="relative">
//               {employee.imageUrl ? (
//                 <img
//                   src={employee.imageUrl}
//                   alt={employee.name}
//                   className="w-24 h-24 rounded-full object-cover"
//                 />
//               ) : (
//                 <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
//                   {employee.name.charAt(0)}
//                 </div>
//               )}
//             </div>

//             <div className="flex-1">
//               <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
//                 {employee.name}
//               </h2>
//               <div className="mt-1 grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div>
//                   <p className="text-sm text-gray-500 dark:text-gray-400">
//                     Role
//                   </p>
//                   <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
//                     {employee.position}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500 dark:text-gray-400">
//                     Phone Number
//                   </p>
//                   <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
//                     {employee.phone}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500 dark:text-gray-400">
//                     Email Address
//                   </p>
//                   <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
//                     {employee.email}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
//             <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
//               <div className="flex items-center">
//                 <Clock className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
//                 <div className="ml-3">
//                   <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
//                     {stats.totalAttendance}
//                   </p>
//                   <p className="text-sm text-gray-500 dark:text-gray-400">
//                     Total Attendance
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
//               <div className="flex items-center">
//                 <LogIn className="h-5 w-5 text-green-600 dark:text-green-400" />
//                 <div className="ml-3">
//                   <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
//                     {stats.avgCheckIn}
//                   </p>
//                   <p className="text-sm text-gray-500 dark:text-gray-400">
//                     Avg Check In Time
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
//               <div className="flex items-center">
//                 <LogOut className="h-5 w-5 text-purple-600 dark:text-purple-400" />
//                 <div className="ml-3">
//                   <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
//                     {stats.avgCheckOut}
//                   </p>
//                   <p className="text-sm text-gray-500 dark:text-gray-400">
//                     Avg Check Out Time
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
//               <div className="flex items-center">
//                 <Award className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
//                 <div className="ml-3">
//                   <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
//                     {stats.performanceScore}
//                   </p>
//                   <p className="text-sm text-gray-500 dark:text-gray-400">
//                     Employee Predicate
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Calendar */}
//           <div className="lg:col-span-2">
//             <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
//               <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
//                 Attendance Calendar
//               </h2>
//               <AttendanceCalendar
//                 attendanceRecords={attendanceRecords}
//                 selectedDate={selectedDate}
//                 onDateSelect={setSelectedDate}
//               />
//             </div>
//           </div>

//           {/* Recent Activity */}
//           <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
//             <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
//               Recent Activity
//             </h2>
//             <div className="space-y-4">
//               {attendanceRecords.slice(0, 5).map((record) => (
//                 <div
//                   key={record.id}
//                   className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
//                 >
//                   <div>
//                     <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
//                       {format(new Date(record.attendanceDate), "MMM dd, yyyy")}
//                     </p>
//                     <div className="flex items-center mt-1">
//                       <Clock className="h-4 w-4 text-gray-400 mr-1" />
//                       <p className="text-sm text-gray-500 dark:text-gray-400">
//                         {record.in_time} - {record.out_time}
//                       </p>
//                     </div>
//                   </div>
//                   <span
//                     className={`px-2 py-1 text-xs font-medium rounded-full ${
//                       record.status === "present"
//                         ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
//                         : record.status === "late"
//                         ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
//                         : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
//                     }`}
//                   >
//                     {record.status.charAt(0).toUpperCase() +
//                       record.status.slice(1)}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default EmployeeDetailPage;
