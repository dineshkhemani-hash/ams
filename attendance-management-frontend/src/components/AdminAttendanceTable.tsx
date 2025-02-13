import { useState } from "react";
import { AttendanceRecord } from "../types";
import AttendanceTable from "./AttendanceTable"
import MonthPicker from "./MonthPicker";
import { useQuery } from "@tanstack/react-query";
import { getDailyAttendance } from "../api";
import { useNavigate } from "react-router";

export const AdminAttendanceTable = () => {
    const navigate = useNavigate();
    // const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState({
        year: new Date().getUTCFullYear(),
        month: new Date().getUTCMonth() + 1,
    });
    const [searchTerm, setSearchTerm] = useState('');
    const { data, isLoading, isError } = useQuery({
        queryKey: ["user-data"],
        queryFn: getDailyAttendance,
        refetchOnWindowFocus: false,
        retry: 1,
    })
    if (isLoading) {
        return <div>Loading.....</div>
    }
    if (isError) {
        navigate("/login", { replace: true })
    }

    const attendanceRecords: AttendanceRecord[] = [
        {
            id: '1',
            userId: '1',
            attendanceDate: '2024-03-01',
            in_time: '09:00 AM',
            out_time: '05:30 PM',
            duration: '8.5',
            status: "ABSENT"
        },
        {
            id: '2',
            userId: '2',
            attendanceDate: '2024-03-01',
            in_time: '08:45 AM',
            out_time: '05:15 PM',
            duration: '8.5',
            status: "ABSENT"
        },
    ];
    const filteredRecords = attendanceRecords.filter(record =>
        record.userId.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            {/* <div className="flex justify-end mb-4">
                <MonthPicker selectedMonth={selectedDate.month} selectedYear={selectedDate.year} onChange={setSelectedDate} />
            </div> */}
            {data && data.length > 0 ? <AttendanceTable records={data} /> : (
                <>
                    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center p-4">
                        <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-8">
                            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
                                Error
                            </h2>
                            <p className="text-center text-red-500 my-10">No attendance found</p>
                            <button
                                onClick={() => navigate("/dashboard")}
                                className="justify-self-center m-auto w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
                            >
                                Go to Dashboard
                            </button>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}