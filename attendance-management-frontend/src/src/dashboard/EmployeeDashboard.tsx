import React, { useCallback, useEffect, useState } from "react";
import { PlusCircle } from "lucide-react";
import Layout from "./Layout";
import MonthPicker from "../components/MonthPicker";
import AttendanceTable from "../components/AttendanceTable";
import AttendanceEntryPopup from "../components/AttendanceEntryPopup";

import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { checkSession, getAllAttendanceReport, submitAttendance } from "../api";
import ErrorPopup from "../components/ErrorPopup";
import { useNavigate } from "react-router";
import { Bounce, ToastContainer, toast } from "react-toastify";
import FingerprintAnimation from "../animation/FingerPrintAnimation";
import AttendanceCharts from "../components/AttendanceCharts";
import { showErrorToast, showSuccessToast } from "../utils/toastUtils";

interface TimeComponents {
  hours: number;
  minutes: number;
  seconds: number;
}
const EmployeeDashboard: React.FC = () => {
  const queryClient = new QueryClient();
  const navigate = useNavigate();
  const [isEntryPopupOpen, setIsEntryPopupOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [selectedDate, setSelectedDate] = useState({
    year: new Date().getUTCFullYear(),
    month: new Date().getUTCMonth() + 1,
  });

  const {
    data: sessionData,
    isLoading: isLoadingSession,
    isError: isErrorSession,
  } = useQuery({
    queryKey: ["session"],
    queryFn: checkSession,
    refetchOnWindowFocus: false,
    retry: 1,
  });
  const {
    data: attendanceData,
    isLoading: isLoadingAttendance,
    isError: isErrorAttendance,
    refetch: refetchAttendance,
  } = useQuery({
    queryKey: ["attendance-record"],
    queryFn: () =>
      getAllAttendanceReport(selectedDate.year, selectedDate.month),
    // queryFn: getAllAttendance,
    refetchOnWindowFocus: false,
    retry: 1,
    enabled: !isLoadingSession, // Only fetch when session is loaded
  });
  // Stable handlers with useCallback
  const handleMonthChange = useCallback((newDate: Date) => {
    setSelectedDate({
      year: newDate.getUTCFullYear(),
      month: newDate.getUTCMonth() + 1,
    });
  }, []);
  // const fetchAttendanceAgain = async () => {
  //     try {
  //         await queryClient.invalidateQueries({ queryKey: ["attendance-record"] })
  //         await refetchAttendance()
  //     } catch (error: any) {
  //         setError(error.response?.data?.message || error.message);
  //     }
  // }
  useEffect(() => {
    // fetchAttendanceAgain()
    refetchAttendance();
  }, [selectedDate]);

  const attendanceInMutation = useMutation({
    mutationFn: submitAttendance,
    onSuccess: async (data) => {
      setIsScanning(true);
      if (data.status.toLowerCase() === "success") {
        await queryClient.invalidateQueries({
          queryKey: ["attendance-record"],
          exact: false, // Invalidate all matching queries
        });
        // await refetchAttendance()
        showSuccessToast("Attendance marked successfully!"); // Use the centralized function
      }
    },
    onError: (error) => {
      setIsScanning(false);
      console.log((error as any).response?.data?.message || error.message);
      showErrorToast(error); // Pass the whole error object for centralized handling
      // setError(error.response?.data?.message || error.message);
    },
  });

  if (isLoadingAttendance || isLoadingSession) {
    return <div>Loading attendance records...</div>;
  }

  if (isErrorAttendance || isErrorSession) {
    return (
      <ErrorPopup
        message={"Error Loading Data"}
        // onClose={() => setError(null)}
        onClose={() => {}}
        position={{
          top: "20px",
          right: "20px",
        }}
      />
    );
  }

  // Ensure that data is an array before mapping
  // const attendanceRecords = attendanceData || [];
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  console.log(attendanceData);
  const todayDate = getCurrentDate();
  // console.log(todayDate)
  const todaysAttendance = attendanceData.find(
    (record) => record.attendanceDate === todayDate
  );
  console.log(todaysAttendance);
  // useEffect(() => {
  //     getAllAttendance()
  // }, [])
  const handleScanComplete = () => {
    setIsScanning(false);
    // Here you would typically make your API call to actually submit the attendance
    console.log("Attendance recorded successfully");
  };
  // Add this utility function at the top of your file
  const parseTimeString = (timeString: string): TimeComponents => {
    if (!timeString?.match(/^(\d{1,2}):(\d{2})(:(\d{2}))?$/)) {
      throw new Error("Invalid time format. Expected HH:MM or HH:MM:SS");
    }

    const parts = timeString.split(":");
    return {
      hours: Number(parts[0]),
      minutes: Number(parts[1]),
      seconds: parts.length === 3 ? Number(parts[2]) : 0,
    };
  };

  const formatTime = (total: TimeComponents): string => {
    // Handle seconds overflow
    let { hours, minutes, seconds } = total;

    minutes += Math.floor(seconds / 60);
    seconds = seconds % 60;

    // Handle minutes overflow
    hours += Math.floor(minutes / 60);
    minutes = minutes % 60;

    return `${hours}:${minutes.toString().padStart(2, "0")}`;
  };
  // Add this function near other time-related functions
  const calculateAverageTime = (
    totalTime: TimeComponents,
    records: number
  ): TimeComponents => {
    if (!records) return { hours: 0, minutes: 0, seconds: 0 };

    // Convert all to total minutes first
    const totalMinutes =
      totalTime.hours * 60 + totalTime.minutes + totalTime.seconds / 60;

    // Calculate average minutes
    const averageMinutes = totalMinutes / records;

    // Convert back to hours, minutes, seconds
    return {
      hours: Math.floor(averageMinutes / 60),
      minutes: Math.floor(averageMinutes % 60),
      seconds: 0,
    };
  };

  // Replace existing average calculation

  let totalTime: TimeComponents = { hours: 0, minutes: 0, seconds: 0 };

  if (attendanceData && attendanceData.length > 0) {
    attendanceData.forEach((record) => {
      if (record.duration) {
        try {
          const time = parseTimeString(record.duration);
          totalTime.hours += time.hours;
          totalTime.minutes += time.minutes;
          totalTime.seconds += time.seconds;
        } catch (error) {
          console.error(`Error parsing duration: ${record.duration}`, error);
        }
      }
    });
  }
  // const totalHours = attendanceData && attendanceData.length > 0 && attendanceData?.reduce((sum, record) => sum + record.duration, 0) || 0;
  // const averageHours = attendanceData && attendanceData.length > 0 ? totalTime.hours / attendanceData.length : 0;
  const averageTime = calculateAverageTime(
    totalTime,
    attendanceData?.length || 0
  );
  return (
    <div>
      <Layout userRole={sessionData?.data.roleName}>
        <div className="bg-white dark:bg-gray-900 dark:border dark:border-gray-300 rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-50">
              My Attendance
            </h1>
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
              <MonthPicker
                selectedMonth={selectedDate.month}
                selectedYear={selectedDate.year}
                onChange={setSelectedDate}
              />
            </div>
          </div>
        </div>
        {attendanceData && attendanceData.length > 0 ? (
          <>
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
              <StatCard
                title="Days Present"
                value={attendanceData ? attendanceData.length : 0}
                color="indigo"
              />
              <StatCard
                title="Total Hours"
                value={formatTime(totalTime)}
                color="green"
              />
              <StatCard
                title="Average Hours/Day"
                value={formatTime(averageTime)}
                color="purple"
              />
              {/* <div className="bg-indigo-50 overflow-hidden shadow rounded-lg">
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
                        </div> */}

              {/* <div className="bg-green-50 overflow-hidden shadow rounded-lg">
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="text-green-600 text-2xl font-bold">

                                            {formatTime(totalTime)}
                                        </div>
                                    </div>
                                    <div className="ml-2 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 truncate">
                                                Total Hours
                                            </dt>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div> */}

              {/* <div className="bg-purple-50 overflow-hidden shadow rounded-lg">
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="text-purple-600 text-2xl font-bold">
                                           
                                            {formatTime(averageTime)}
                                           
                                        </div>
                                    </div>
                                    <div className="ml-2 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 truncate">
                                                Average Hours/Day
                                            </dt>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div> */}
            </div>
            {/* Charts Section */}
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg shadow-gray-300 dark:shadow-gray-50 shadow-sm  my-10 p-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
                Attendance Analytics
              </h2>
              <AttendanceCharts records={attendanceData} />
            </div>
            <AttendanceTable records={attendanceData || []} />

            {todaysAttendance && (
              <AttendanceEntryPopup
                isOpen={isEntryPopupOpen}
                onClose={() => setIsEntryPopupOpen(false)}
                attendance_id={todaysAttendance.id}

                // onSubmit={handleAttendanceSubmit}
              />
            )}
          </>
        ) : (
          <EmptyState onAddAttendance={() => navigate("/dashboard")} />
        )}
      </Layout>
      {error && (
        <ErrorPopup
          message={error}
          // onClose={() => setError(null)}
          onClose={() => {
            setError(null);
          }}
          position={{
            top: "20px",
            right: "20px",
          }}
        />
      )}
      <FingerprintAnimation
        isScanning={isScanning}
        onComplete={handleScanComplete}
        duration={10000} // 3 seconds animation
      />
    </div>
  );
};
// Helper Components
const StatCard = React.memo(
  ({
    title,
    value,
    color,
  }: {
    title: string;
    value: string | number;
    color: string;
  }) => {
    const colorClasses = {
      indigo:
        "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20  dark:text-indigo-400 ",
      green:
        "bg-green-50 text-green-600  dark:bg-green-900/20  dark:text-green-400",
      purple:
        "bg-purple-50 text-purple-600   dark:bg-purple-900/20  dark:text-purple-400 ",
    }[color];
    return (
      <div className={`overflow-hidden shadow rounded-lg  ${colorClasses}`}>
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <p className={`text-2xl font-bold`}>{value}</p>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-l  text-gray-500 dark:text-gray-400 font-medium truncate">
                  {title}
                </dt>
              </dl>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
const EmptyState = React.memo(
  ({ onAddAttendance }: { onAddAttendance: () => void }) => (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Error
        </h2>
        <p className="text-center text-red-500 my-10">
          No Attendance Record Found
        </p>
        <button
          onClick={onAddAttendance}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
        >
          Add Attendance
        </button>
      </div>
    </div>
  )
);

export default EmployeeDashboard;
