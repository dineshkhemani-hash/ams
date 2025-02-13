import React, { useEffect, useState } from 'react';
import { PlusCircle } from 'lucide-react';
import Layout from './Layout';
import MonthPicker from '../components/MonthPicker';
import AttendanceTable from '../components/AttendanceTable';
import AttendanceEntryPopup from '../components/AttendanceEntryPopup';

import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { checkSession, getAllAttendanceReport, submitAttendance } from '../api';
import ErrorPopup from '../components/ErrorPopup';
import { useNavigate } from 'react-router';
import { Bounce, ToastContainer, toast } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
const EmployeeDashboard: React.FC = () => {
    const notify = () => {
        toast.success('Attendance marked successfully!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
    };
    const errorToast = (error: string) => {
        toast.error(error, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
    }
    const queryClient = new QueryClient();
    const navigate = useNavigate();
    const [isEntryPopupOpen, setIsEntryPopupOpen] = useState(false);
    const [error, setError] = useState<string | null>(null)
    const [selectedDate, setSelectedDate] = useState({
        year: new Date().getUTCFullYear(),
        month: new Date().getUTCMonth() + 1,
    });

    // const attendanceRecords: AttendanceRecord[] = [
    //     {
    //         id: '1',
    //         userId: '1',
    //         userName: 'John Doe',
    //         date: '2024-03-01',
    //         inTime: '09:00 AM',
    //         outTime: '05:30 PM',
    //         totalHours: 8.5,
    //     },
    //     // Add more mock records
    // ];

    // const totalHours = attendanceRecords.reduce((sum, record) => sum + record.totalHours, 0);
    // const averageHours = totalHours / attendanceRecords.length;

    // const handleAttendanceSubmit = async (data: {
    //     attendanceDate: string;
    //     in_time: string;
    //     out_time: string | null
    // }) => {
    //     try {
    //         // Replace with your API call
    //         console.log('Submitting attendance:', data);
    //         // After successful submission, refresh the attendance records
    //     } catch (error) {
    //         console.error('Error submitting attendance:', error);
    //     }
    // };

    const { data: attendanceData, isLoading: isLoadingAttendance, isError: isErrorAttendance, refetch: refetchAttendance } = useQuery({
        queryKey: ["attendance-record"],
        queryFn: () => getAllAttendanceReport(selectedDate.year, selectedDate.month),
        // queryFn: getAllAttendance,
        refetchOnWindowFocus: false,
        retry: 1,

    });
    const fetchAttendanceAgain = async () => {
        try {
            await queryClient.invalidateQueries({ queryKey: ["attendance-record"] })
            await refetchAttendance()
        } catch (error: any) {
            setError(error.response?.data?.message || error.message);
        }
    }
    useEffect(() => {
        fetchAttendanceAgain()
    }, [selectedDate])
    const showPosition = (position) => {
        const { latitude, longitude } = position.coords;
        console.log("Latitude is " + latitude);
        console.log("Longtitude is " + longitude);
    }
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                // Success function
                showPosition,
                // Error function
                null,
                // Options. See MDN for details.
                {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0
                });
        }
        // navigator.geolocation.getCurrentPosition((position) => {
        //     const { latitude, longitude } = position.coords;
        //     console.log("Latitude is " + latitude);
        //     console.log("Longtitude is " + longitude);

        // },{
        //     enab
        // })

    }, [selectedDate])
    const { data: sessionData, isLoading: isLoadingSession, isError: isErrorSession } = useQuery({
        queryKey: ["session"],
        queryFn: checkSession,
        refetchOnWindowFocus: false,
        retry: 1,
    });

    const attendanceInMutation = useMutation({
        mutationFn: submitAttendance,
        onSuccess: async (data) => {

            if (data.status.toLowerCase() === "success") {
                await queryClient.invalidateQueries({ queryKey: ["attendance-record"] })
                await refetchAttendance()
                notify();
            }
        },
        onError: (error) => {
            console.log((error as any).response?.data?.message || error.message)
            errorToast((error as any).response?.data?.message || error.message)
            // setError(error.response?.data?.message || error.message);
        }
    })

    if (isLoadingAttendance || isLoadingSession) {
        return <div>Loading attendance records...</div>;
    }

    if (isErrorAttendance || isErrorSession) {
        return <ErrorPopup
            message={"Error Loading Data"}
            // onClose={() => setError(null)}
            onClose={() => { }}
            position={{
                top: '20px',
                right: '20px'
            }}
        />
    }

    // Ensure that data is an array before mapping
    // const attendanceRecords = attendanceData || [];
    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    console.log(attendanceData);
    const todayDate = getCurrentDate();
    // console.log(todayDate)
    const todaysAttendance = attendanceData.find((record) => record.attendanceDate === todayDate);
    console.log(todaysAttendance);
    // useEffect(() => {
    //     getAllAttendance()
    // }, [])

    return (
        <div>
            <Layout userRole="employee">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex justify-between items-center flex-wrap gap-4">
                        <h1 className="text-2xl font-bold text-gray-800">My Attendance</h1>
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => attendanceInMutation.mutate()}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                <PlusCircle className="h-4 w-4 mr-2" />
                                Mark In Time
                            </button>
                            <button
                                onClick={() => setIsEntryPopupOpen(true)}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                <PlusCircle className="h-4 w-4 mr-2" />
                                Mark Out Time
                            </button>
                            <MonthPicker selectedMonth={selectedDate.month} selectedYear={selectedDate.year} onChange={setSelectedDate} />
                        </div>
                    </div>
                </div>
                {attendanceData && attendanceData.length > 0 ? (<>
                    <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
                        <div className="bg-indigo-50 overflow-hidden shadow rounded-lg">
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="text-indigo-600 text-2xl font-bold">
                                            {attendanceData ? attendanceData.length : 0}
                                        </div>
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 truncate">
                                                Days Present
                                            </dt>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-green-50 overflow-hidden shadow rounded-lg">
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="text-green-600 text-2xl font-bold">
                                            {/* {totalHours.toFixed(1)} */}
                                            Total hours here
                                        </div>
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 truncate">
                                                Total Hours
                                            </dt>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-purple-50 overflow-hidden shadow rounded-lg">
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="text-purple-600 text-2xl font-bold">
                                            {/* {averageHours.toFixed(1)} */}
                                            Average hours here
                                        </div>
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 truncate">
                                                Average Hours/Day
                                            </dt>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <AttendanceTable records={attendanceData || []} />

                    {todaysAttendance && <AttendanceEntryPopup
                        isOpen={isEntryPopupOpen}
                        onClose={() => setIsEntryPopupOpen(false)}
                        attendance_id={todaysAttendance.id}

                    // onSubmit={handleAttendanceSubmit}
                    />}</>) : <><div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center p-4">
                        <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-8">
                            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
                                Error
                            </h2>
                            <p className="text-center text-red-500 my-10">No Attendance Record Found</p>
                            <button
                                onClick={() => navigate("/dashboard")}
                                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
                            >
                                Add Attendance
                            </button>
                        </div>
                    </div> </>}
            </Layout>
            {error && <ErrorPopup
                message={error}
                // onClose={() => setError(null)}
                onClose={() => { setError(null) }}
                position={{
                    top: '20px',
                    right: '20px'
                }}
            />}
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
        </div>
    );
};

export default EmployeeDashboard;
