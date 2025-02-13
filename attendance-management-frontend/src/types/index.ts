export interface LoginFormData {
    email: string;
    password: string;
}
export interface SignupFormData extends LoginFormData {
    name: string;
}
export interface User {
    id: string;
    name: string;
    email: string;
    roleName: 'admin' | 'employee' | "user";
}
// "userId": "bbfa6d11-3125-4da4-95e6-be56f298968e",
// "id": "66535900-2761-4c76-ad73-cd66cb18d3fd",
// "attendanceDate": "2025-02-03",
// "in_time": "18:21:07",
// "out_time": "19:40:00",
// "duration": "01:18:53",
// "status": "ABSENT"
export interface AttendanceRecord {
    id: string;
    user?: User;
    name?: string;
    userId: string;
    attendanceDate: string;
    in_time: string;
    out_time: string;
    duration: string;
    status: string;
}

export interface MonthlyAttendance {
    userId: string;
    userName: string;
    records: AttendanceRecord[];
    totalDays: number;
    totalHours: number;
    averageHours: number;
}

// <Layout userRole="employee">
//     <div className="bg-white rounded-lg shadow-md p-6">
//         <div className="flex justify-between items-center flex-wrap gap-4">
//             <h1 className="text-2xl font-bold text-gray-800">My Attendance</h1>
//             <div className="flex items-center space-x-4">
//                 <button
//                     onClick={() => attendanceInMutation.mutate()}
//                     className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                 >
//                     <PlusCircle className="h-4 w-4 mr-2" />
//                     Mark In Time
//                 </button>
//                 <button
//                     onClick={() => setIsEntryPopupOpen(true)}
//                     className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                 >
//                     <PlusCircle className="h-4 w-4 mr-2" />
//                     Mark Out Time
//                 </button>
//                 <MonthPicker selectedDate={selectedDate} onChange={setSelectedDate} />
//             </div>
//         </div>

//         <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
//             <div className="bg-indigo-50 overflow-hidden shadow rounded-lg">
//                 <div className="p-5">
//                     <div className="flex items-center">
//                         <div className="flex-shrink-0">
//                             <div className="text-indigo-600 text-2xl font-bold">
//                                 {attendanceData ? attendanceData.length : 0}
//                             </div>
//                         </div>
//                         <div className="ml-5 w-0 flex-1">
//                             <dl>
//                                 <dt className="text-sm font-medium text-gray-500 truncate">
//                                     Days Present
//                                 </dt>
//                             </dl>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <div className="bg-green-50 overflow-hidden shadow rounded-lg">
//                 <div className="p-5">
//                     <div className="flex items-center">
//                         <div className="flex-shrink-0">
//                             <div className="text-green-600 text-2xl font-bold">
//                                 {/* {totalHours.toFixed(1)} */}
//                                 Total hours here
//                             </div>
//                         </div>
//                         <div className="ml-5 w-0 flex-1">
//                             <dl>
//                                 <dt className="text-sm font-medium text-gray-500 truncate">
//                                     Total Hours
//                                 </dt>
//                             </dl>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <div className="bg-purple-50 overflow-hidden shadow rounded-lg">
//                 <div className="p-5">
//                     <div className="flex items-center">
//                         <div className="flex-shrink-0">
//                             <div className="text-purple-600 text-2xl font-bold">
//                                 {/* {averageHours.toFixed(1)} */}
//                                 Average hours here
//                             </div>
//                         </div>
//                         <div className="ml-5 w-0 flex-1">
//                             <dl>
//                                 <dt className="text-sm font-medium text-gray-500 truncate">
//                                     Average Hours/Day
//                                 </dt>
//                             </dl>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>

//         <AttendanceTable records={attendanceRecords} />

//         <AttendanceEntryPopup
//             isOpen={isEntryPopupOpen}
//             onClose={() => setIsEntryPopupOpen(false)}
//             attendance_id={todaysAttendance.id}
//         // onSubmit={handleAttendanceSubmit}
//         />
//     </div>
// </Layout>
