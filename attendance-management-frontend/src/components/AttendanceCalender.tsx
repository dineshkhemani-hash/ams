import React, { useState } from "react";
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
  formatDate,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AttendanceRecord } from "../types";

interface AttendanceCalendarProps {
  attendanceRecords: AttendanceRecord[];
  selectedDateMonth: number;
  selectedDateYear: number;
  onChange: React.Dispatch<
    React.SetStateAction<{ year: number; month: number }>
  >;
}

const AttendanceCalendar: React.FC<AttendanceCalendarProps> = ({
  attendanceRecords,
  selectedDateMonth,
  selectedDateYear,
  onChange,
}) => {
  const [disableNext, setDisableNext] = useState(true);
  // Create the date object for the selected month
  const monthStart = startOfMonth(
    new Date(selectedDateYear, selectedDateMonth - 1)
  );
  // Get calendar days
  const monthEnd = endOfMonth(monthStart);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);
  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getAttendanceStatus = (date: Date) => {
    console.log("Checking date:", format(date, "yyyy-MM-dd")); // Debug log
    const record = attendanceRecords.find((record) => {
      const recordDate = new Date(record.attendanceDate);
      return format(recordDate, "yyyy-MM-dd") === format(date, "yyyy-MM-dd");
    });
    // const formattedDate = format(date, "yyyy-MM-dd");
    // const record = attendanceRecords.find(
    //   (r) => format(new Date(r.attendanceDate), "yyyy-MM-dd") === formattedDate
    // );
    // const record = attendanceRecords.find((r) =>
    //   isSameDay(new Date(r.attendanceDate), date)
    // );
    console.log("Found record:", record); // Debug log
    return record?.status || "ABSENT";
    return record?.status?.toUpperCase() || "ABSENT";
  };

  const getStatusColor = (status: string = "ABSENT") => {
    switch (status.toUpperCase()) {
      case "FULL_DAY":
        return "bg-green-500 dark:bg-green-500";
      case "HALF_DAY":
        return "bg-yellow-500 dark:bg-yellow-500";
      case "ABSENT":
        return "bg-red-500";
      default:
        return "bg-gray-400";
    }
  };
  // const handlePrevMonth = () => {
  //   onDateSelect(subMonths(selectedDateMonth, 1));
  // };

  // const handleNextMonth = () => {
  //   onDateSelect(addMonths(selectedDateMonth, 1));
  // };
  const handlePreviousMonth = () => {
    // const newDate = new Date(selectedMonth.setMonth(selectedMonth - 1));
    // console.log(new Date(selectedMonth.setMonth(selectedMonth - 1)).getMonth());
    onChange((prev) => {
      let newYear = prev.year;
      let newMonth = prev.month - 1;
      if (newMonth < 1) {
        // if jan then go to december
        newMonth = 12;
        newYear -= 1;
      }

      setDisableNext(false);
      return { year: newYear, month: newMonth };
    });
  };

  const handleNextMonth = () => {
    const currentYear = new Date().getUTCFullYear();
    const currentMonth = new Date().getUTCMonth() + 1;
    onChange((prev) => {
      let newYear = prev.year;
      let newMonth = prev.month + 1;

      // If month exceeds December, wrap to January and advance year.
      if (newMonth > 12) {
        newMonth = 1;
        newYear += 1;
      }
      // If the new selection is beyond current date, do not allow it.
      if (newMonth > currentMonth && newYear == currentYear) {
        // newMonth = selectedMonth;
        // newYear = selectedYear;
        setDisableNext(true);
        return { year: currentYear, month: currentMonth };
      }
      setDisableNext(false);

      return { year: newYear, month: newMonth };
    });
  };
  function formateDate(year, month) {
    const date = new Date(year, month - 1);
    const formattedDate = date.toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
    return formattedDate;
  }
  return (
    <div className="sm:w-full flex flex-col justify-center items-center gap-2  ">
      <div className="flex items-center justify-between  mb-6">
        <button
          onClick={handlePreviousMonth}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
        >
          <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
        </button>
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          {formateDate(selectedDateYear, selectedDateMonth)}
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
            className="text-center text-sm p-2 font-medium text-gray-500 dark:text-gray-400"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => {
          const isCurrentMonth = isSameMonth(day, monthStart);
          const status = getAttendanceStatus(day);
          const statusColor = getStatusColor(status);
          console.log(
            "Day:",
            format(day, "yyyy-MM-dd"),
            "Status:",
            status,
            "Color:",
            statusColor
          ); // Debug log
          return (
            <div
              key={day.toString()}
              className={`aspect-square p-1 relative ${
                !isCurrentMonth && "opacity-50"
              }`}
            >
              <button
                // onClick={() => onDateSelect(day)}
                className={`w-full h-full flex items-center justify-center rounded-full text-sm p-2 relative ${
                  isSameDay(day, new Date())
                    ? `bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-200 ${statusColor} `
                    : `hover:bg-gray-100 dark:hover:bg-gray-700 ${statusColor}`
                }`}
              >
                <span className="relative z-10">{format(day, "d")}</span>
                {isCurrentMonth && (
                  <span
                    className={`absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 rounded-full `}
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
