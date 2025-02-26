import React, { useEffect, useState } from 'react';
import { Search, UserPlus, Users, Calendar } from 'lucide-react';
import Layout from './Layout';

import {  AttendanceRecord, User } from '../types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { checkSession, getAllUsers, searchUserFromAdmin } from '../api';
import { useNavigate } from 'react-router';
import { AdminAttendanceTable } from '../components/AdminAttendanceTable';
import { AdminUserData } from '../components/AdminUserData';
import UserForm from '../components/UserForm';
import AddUserForm from '../components/AddUserForm';
import ExportMenu from '../components/ExportMenu';
import { format } from 'date-fns';

const AdminDashboard: React.FC = () => {
    const navigate = useNavigate();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedValue,setDebouncedValue] = useState(searchTerm);
  const [isUserFormOpen, setIsUserFormOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<'users' | 'attendance'>('users');
  const [isEditAttendanceOpen, setIsEditAttendanceOpen] = useState(false);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(searchTerm);
    },1000);
    return () => {
      clearTimeout(handler);
    }
  },[searchTerm])

const {data:sessionData,isLoading,isError} = useQuery({
    queryKey:["session"],
    queryFn:checkSession,
    refetchOnWindowFocus:false,
    retry:1,
});


    if(isLoading  ){
        return <div>Loading.....</div>
    }
    if(isError || sessionData.data.roleName != "ADMIN"){
        navigate("/login",{replace:true})
    }
    
  // Mock data - replace with actual API calls
  const users: User[] = [
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'employee' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'employee' },
  ];
  const attendanceRecords: AttendanceRecord[] = [
    {
      id: '1',
      userId: '1',
      name: 'John Doe',
      attendanceDate: '2024-03-01',
      in_time: '09:00',
      out_time: '17:30',
      duration: '8.5',
      status:'absent'
    },
    {
      id: '2',
      userId: '2',
      name: 'Jane Smith',
      attendanceDate: '2024-03-01',
      in_time: '08:45',
      out_time: '17:15',
      duration: '8.5',
      status:'absent'
    },
  ];
  
  const handleCreateUser = async (userData: any) => {
    try {
        // Replace with your API call
        console.log('Creating user:', userData);
    } catch (error) {
        console.error('Error creating user:', error);
    }
};
const handleUpdateUser = async (userData: any) => {
    try {
        // Replace with your API call
        console.log('Updating user:', userData);
    } catch (error) {
        console.error('Error updating user:', error);
    }
};

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredRecords = attendanceRecords.filter(record =>
    record.name!.toLowerCase().includes(searchTerm.toLowerCase())
  );
  console.log(sessionData.data.roleName != "ADMIN" )
  return (
    // <Layout userRole="admin">
    //   <div className="bg-white rounded-lg shadow-md p-6">
    //     <div className="flex justify-between items-center flex-wrap gap-4 mb-6">
    //       <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
    //       <div className="flex items-center space-x-4">
    //         <div className="relative">
    //           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
    //             <Search className="h-5 w-5 text-gray-400" />
    //           </div>
    //           <input
    //             type="text"
    //             placeholder="Search..."
    //             value={searchTerm}
    //             onChange={(e) => setSearchTerm(e.target.value)}
    //             className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    //           />
    //         </div>
    //         <button
    //           onClick={() => {
    //             setSelectedUser(null);
    //             setIsUserFormOpen(true);
    //           }}
    //           className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    //         >
    //           <UserPlus className="h-4 w-4 mr-2" />
    //           Create User
    //         </button>
    //       </div>
    //     </div>

    //     <div className="mb-6">
    //       <div className="border-b border-gray-200">
    //         <nav className="-mb-px flex space-x-8">
    //           <button
    //             onClick={() => setActiveTab('users')}
    //             className={`${
    //               activeTab === 'users'
    //                 ? 'border-indigo-500 text-indigo-600'
    //                 : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
    //             } flex items-center whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
    //           >
    //             <Users className="h-5 w-5 mr-2" />
    //             Users
    //           </button>
    //           <button
    //             onClick={() => setActiveTab('attendance')}
    //             className={`${
    //               activeTab === 'attendance'
    //                 ? 'border-indigo-500 text-indigo-600'
    //                 : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
    //             } flex items-center whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
    //           >
    //             <Calendar className="h-5 w-5 mr-2" />
    //             Daily Attendance Records
    //           </button>
    //         </nav>
    //       </div>
    //     </div>

    //     {activeTab === 'users' ? (
    //         <AdminUserData debouncedValue={debouncedValue}  />
    //     ) : (
    //       <AdminAttendanceTable />
    //     )}
    //         <AddUserForm
    //             isOpen={isUserFormOpen}
    //             onClose={() => {
    //                 setIsUserFormOpen(false);
    //                 // setSelectedUser(null);
    //             }}
    //             // onSubmit={selectedUser ? handleUpdateUser : handleCreateUser}
    //             initialData={selectedUser || undefined}
    //             // mode={selectedUser ? 'update' : 'create'}
    //         />
       
    //   </div>
    // </Layout>
    <>
   {sessionData.data.roleName != "ADMIN" ? (<>
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center p-4">
                            <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-8">
                                <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
                                    Error
                                </h2>
                                <p className="text-center text-red-500 my-10">You are not authorized</p>
                                <button
                                    onClick={() => navigate("/dashboard")}
                                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
                                >
                                    Go to Dashboard
                                </button>
                            </div>
                        </div>
    </>) : (<>
      <Layout userRole={sessionData?.data.roleName}>
      <div className="bg-white  dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center flex-wrap gap-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                // className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                className=' className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 sm:text-sm"'
              />
            </div>
           
            <button
              onClick={() => {
                setSelectedUser(null);
                setIsUserFormOpen(true);
              }}
              // className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Create User
            </button>
          </div>
        </div>

        <div className="mb-6">
          <div className="border-b border-gray-200  dark:border-gray-700">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('users')}
                // className={`${
                //   activeTab === 'users'
                //     ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                //     : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                // } flex items-center whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                className={`${
                  activeTab === 'users'
                    ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'
                } flex items-center whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                <Users className="h-5 w-5 mr-2" />
                Users
              </button>
              <button
                onClick={() => setActiveTab('attendance')}
                // className={`${
                //   activeTab === 'attendance'
                //     ? 'border-indigo-500 text-indigo-600'
                //     : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                // } flex items-center whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                className={`${
                  activeTab === 'attendance'
                    ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'
                } flex items-center whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                <Calendar className="h-5 w-5 mr-2" />
                Daily Attendance Records
              </button>
            </nav>
          </div>
        </div>

        {activeTab === 'users' ? (
            <AdminUserData debouncedValue={debouncedValue}  />
        ) : (
          <AdminAttendanceTable />
        )}
            <AddUserForm
                isOpen={isUserFormOpen}
                onClose={() => {
                    setIsUserFormOpen(false);
                    // setSelectedUser(null);
                }}
                // onSubmit={selectedUser ? handleUpdateUser : handleCreateUser}
                initialData={selectedUser || undefined}
                // mode={selectedUser ? 'update' : 'create'}
            />
       
      </div>
    </Layout></>)}
  </>
  );
};

export default AdminDashboard;





// import React, { useState } from 'react';

// import { AttendanceRecord, User } from '../types';
// import MonthPicker from '../components/MonthPicker';
// import AttendanceTable from '../components/AttendanceTable';
// import Layout from '../components/Layout';
// import { Search } from 'lucide-react';
// import { useQuery } from '@tanstack/react-query';
// import { getAllAttendance } from '../api';
// import ErrorPopup from '../components/ErrorPopup';


// const AdminDashboard: React.FC = () => {
//     const [selectedDate, setSelectedDate] = useState(new Date());
//     const [searchTerm, setSearchTerm] = useState('');
//     const { data, isLoading, isError } = useQuery({
//         queryKey: ["attendance-record"],
//         queryFn: getAllAttendance,
//         refetchOnWindowFocus: false,
//         retry: 1,
//     });
//     console.log(data);
//     if (isLoading) {
//         return <div>Loading attendance records...</div>;
//     }

//     if (isError) {
//         return <ErrorPopup
//             message={"Error Loading Data"}
//             // onClose={() => setError(null)}
//             onClose={() => { }}
//             position={{
//                 top: '20px',
//                 right: '20px'
//             }}
//         />



//     }

//     // Ensure that data is an array before mapping
//     const attendanceRecords = data || [];  // default to empty array if data is undefined

//     // Mock data - replace with actual API calls
//     const users: User[] = [
//         { id: '1', name: 'John Doe', email: 'john@example.com', role: 'employee' },
//         { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'employee' },
//     ];

//     // const attendanceRecords: AttendanceRecord[] = [
//     //     {
//     //         id: '1',
//     //         userId: '1',
//     //         userName: 'John Doe',
//     //         date: '2024-03-01',
//     //         inTime: '09:00 AM',
//     //         outTime: '05:30 PM',
//     //         totalHours: 8.5,
//     //     },
//     //     {
//     //         id: '2',
//     //         userId: '2',
//     //         userName: 'Jane Smith',
//     //         date: '2024-03-01',
//     //         inTime: '08:45 AM',
//     //         outTime: '05:15 PM',
//     //         totalHours: 8.5,
//     //     },
//     //     // Add more mock records
//     // ];

//     // const filteredRecords = attendanceRecords.filter(record =>
//     //     record.userName.toLowerCase().includes(searchTerm.toLowerCase())
//     // );

//     const totalEmployees = users.length;
//     // const averageHours = filteredRecords.reduce((sum, record) => sum + record.totalHours, 0) / filteredRecords.length;
//     // const presentToday = new Set(filteredRecords.map(record => record.userId)).size;

//     return (
//         <Layout userRole="admin">
//             <div className="bg-white rounded-lg shadow-md p-6">
//                 <div className="flex justify-between items-center flex-wrap gap-4">
//                     <h1 className="text-2xl font-bold text-gray-800">Employee Attendance</h1>
//                     <div className="flex items-center space-x-4">
//                         <div className="relative">
//                             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                                 <Search className="h-5 w-5 text-gray-400" />
//                             </div>
//                             <input
//                                 type="text"
//                                 placeholder="Search employees..."
//                                 value={searchTerm}
//                                 onChange={(e) => setSearchTerm(e.target.value)}
//                                 className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                             />
//                         </div>
//                         {/* <MonthPicker selectedDate={selectedDate} onChange={setSelectedDate} /> */}
//                     </div>
//                 </div>

//                 <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
//                     <div className="bg-indigo-50 overflow-hidden shadow rounded-lg">
//                         <div className="p-5">
//                             <div className="flex items-center">
//                                 <div className="flex-shrink-0">
//                                     <div className="text-indigo-600 text-2xl font-bold">
//                                         {totalEmployees}
//                                     </div>
//                                 </div>
//                                 <div className="ml-5 w-0 flex-1">
//                                     <dl>
//                                         <dt className="text-sm font-medium text-gray-500 truncate">
//                                             Total Employees
//                                         </dt>
//                                     </dl>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="bg-green-50 overflow-hidden shadow rounded-lg">
//                         <div className="p-5">
//                             <div className="flex items-center">
//                                 <div className="flex-shrink-0">
//                                     <div className="text-green-600 text-2xl font-bold">
//                                         {/* {presentToday} */}
//                                         Hello
//                                     </div>
//                                 </div>
//                                 <div className="ml-5 w-0 flex-1">
//                                     <dl>
//                                         <dt className="text-sm font-medium text-gray-500 truncate">
//                                             Present Today
//                                         </dt>
//                                     </dl>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="bg-purple-50 overflow-hidden shadow rounded-lg">
//                         <div className="p-5">
//                             <div className="flex items-center">
//                                 <div className="flex-shrink-0">
//                                     <div className="text-purple-600 text-2xl font-bold">
//                                         {/* {averageHours.toFixed(1)} */}
//                                         Average here
//                                     </div>
//                                 </div>
//                                 <div className="ml-5 w-0 flex-1">
//                                     <dl>
//                                         <dt className="text-sm font-medium text-gray-500 truncate">
//                                             Average Hours/Day
//                                         </dt>
//                                     </dl>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
                
//                 <AttendanceTable records={attendanceRecords} showUserName={true} />
//             </div>
//         </Layout>
//     );
// };

// export default AdminDashboard;