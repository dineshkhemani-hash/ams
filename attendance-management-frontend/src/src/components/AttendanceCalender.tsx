import React from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  getDay,
  startOfWeek,
  endOfWeek,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AttendanceRecord } from "../types";

interface AttendanceCalendarProps {
  attendanceRecords: AttendanceRecord[];
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

const AttendanceCalendar: React.FC<AttendanceCalendarProps> = ({
  attendanceRecords,
  selectedDate,
  onDateSelect,
}) => {
  const monthStart = startOfMonth(selectedDate);
  const monthEnd = endOfMonth(monthStart);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getAttendanceStatus = (date: Date) => {
    const record = attendanceRecords.find((r) =>
      isSameDay(new Date(r.date), date)
    );
    return record?.status || "absent";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "present":
        return "bg-green-500 dark:bg-green-600";
      case "half-day":
        return "bg-yellow-500 dark:bg-yellow-600";
      case "absent":
        return "bg-red-500 dark:bg-red-600";
      case "late":
        return "bg-yellow-500 dark:bg-yellow-600";
      default:
        return "bg-gray-200 dark:bg-gray-700";
    }
  };

  const handlePrevMonth = () => {
    onDateSelect(subMonths(selectedDate, 1));
  };

  const handleNextMonth = () => {
    onDateSelect(addMonths(selectedDate, 1));
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={handlePrevMonth}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
        >
          <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
        </button>
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          {format(selectedDate, "MMMM yyyy")}
        </h2>
        <button
          onClick={handleNextMonth}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
        >
          <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-400" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day) => (
          <div
            key={day}
            className="text-center text-sm font-medium text-gray-500 dark:text-gray-400"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => {
          const isCurrentMonth = isSameMonth(day, selectedDate);
          const status = getAttendanceStatus(day);
          const statusColor = getStatusColor(status);

          return (
            <div
              key={day.toString()}
              className={`aspect-square p-1 relative ${
                !isCurrentMonth && "opacity-50"
              }`}
            >
              <button
                onClick={() => onDateSelect(day)}
                className={`w-full h-full flex items-center justify-center rounded-full text-sm relative ${
                  isSameDay(day, selectedDate)
                    ? "bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-200"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <span className="relative z-10">{format(day, "d")}</span>
                {isCurrentMonth && (
                  <span
                    className={`absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 rounded-full ${statusColor}`}
                  />
                )}
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex items-center justify-center space-x-4">
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-green-500 mr-2" />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Present
          </span>
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-yellow-500 mr-2" />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Half Day/Late
          </span>
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-red-500 mr-2" />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Absent
          </span>
        </div>
      </div>
    </div>
  );
};

export default AttendanceCalendar;
