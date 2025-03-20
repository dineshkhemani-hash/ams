import React, { useState } from "react";
import { format } from "date-fns";
import { Clock } from "lucide-react";
import { AttendanceRecord } from "../types";
import Pagination from "./Pagination";
import ErrorPopup from "./ErrorPopup";
import { Link } from "react-router";

interface AttendanceHistoryProps {
  records: AttendanceRecord[];
}

const AttendanceHistory: React.FC<AttendanceHistoryProps> = ({ records }) => {
  //pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const totalPages = Math.ceil(records.length / recordsPerPage);
  //calculate pagination values
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = records.slice(indexOfFirstRecord, indexOfLastRecord);
  //handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  const getStatusColor = (status: string = "absent") => {
    switch (status) {
      case "FULL_DAY":
        return "bg-emerald-400/10 text-emerald-400";
      case "HALF_DAY":
        return "bg-yellow-400/10 text-yellow-400";
      case "ABSENT":
        return "bg-red-400/10 text-red-400";
      default:
        return "bg-gray-400/10 text-gray-400";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          Attendance History
        </h2>
        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-lg bg-gray-900/5 dark:bg-gray-100/5 hover:bg-gray-900/10 dark:hover:bg-gray-100/10">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-600 dark:text-gray-400"
            >
              <rect width="7" height="7" x="3" y="3" rx="1" />
              <rect width="7" height="7" x="14" y="3" rx="1" />
              <rect width="7" height="7" x="14" y="14" rx="1" />
              <rect width="7" height="7" x="3" y="14" rx="1" />
            </svg>
          </button>
          <button className="p-2 rounded-lg bg-gray-900/5 dark:bg-gray-100/5 hover:bg-gray-900/10 dark:hover:bg-gray-100/10">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-600 dark:text-gray-400"
            >
              <line x1="3" x2="21" y1="6" y2="6" />
              <line x1="3" x2="21" y1="12" y2="12" />
              <line x1="3" x2="21" y1="18" y2="18" />
            </svg>
          </button>
          <button className="flex items-center space-x-1 px-3 py-2 rounded-lg bg-gray-900/5 dark:bg-gray-100/5 hover:bg-gray-900/10 dark:hover:bg-gray-100/10 text-gray-600 dark:text-gray-400">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 6h18" />
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
              <path d="M19 6c0-1-1-2-2-2H7c-1 0-2 1-2 2" />
              <line x1="10" x2="10" y1="11" y2="17" />
              <line x1="14" x2="14" y1="11" y2="17" />
            </svg>
            <span className="text-sm">Sort</span>
          </button>
          <button className="flex items-center space-x-1 px-3 py-2 rounded-lg bg-gray-900/5 dark:bg-gray-100/5 hover:bg-gray-900/10 dark:hover:bg-gray-100/10 text-gray-600 dark:text-gray-400">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            </svg>
            <span className="text-sm">Filter</span>
          </button>
        </div>
      </div>

      {currentRecords.length > 0 ? (
        <div className="grid gap-4">
          {currentRecords.map((record) => (
            <div
              key={record.id}
              className="p-4 rounded-xl bg-gray-900/5 dark:bg-gray-100/5 backdrop-blur-xl"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    {/* {format(new Date(record.attendanceDate), "MMMM dd, yyyy")} */}
                    {record.attendanceDate}
                  </span>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    record.status
                  )}`}
                >
                  {record.status?.charAt(0).toUpperCase() +
                    record.status?.slice(1) || "Absent"}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Check In Time
                  </p>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {record.in_time || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Check Out Time
                  </p>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {record.out_time || "-"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState />
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};
const EmptyState = React.memo(() => (
  <div className="min-h-screen  bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-950 flex items-center justify-center p-4">
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md p-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-200">
        Error
      </h2>
      <p className="text-center text-red-500 dark:text-red-400 my-10">
        No Attendance Record Found
      </p>
      <Link
        to="/dashboard"
        className="block w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 transition text-center"
      >
        Mark Attendance
      </Link>
    </div>
  </div>
));
export default AttendanceHistory;
