import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { format } from "date-fns";
import { AttendanceRecord } from "../types";

interface AttendanceChartsProps {
  records: AttendanceRecord[];
}
interface TimeComponents {
  hours: number;
  minutes: number;
  seconds: number;
}

const COLORS = ["#4F46E5", "#10B981", "#F59E0B", "#EF4444"];

const AttendanceCharts: React.FC<AttendanceChartsProps> = ({ records }) => {
  // Process data for daily hours chart

  // Process data for attendance status
  const totalDays = records.length;
  const onTimeDays = records.filter((record) => {
    const inTime = new Date(`2000-01-01T${record.in_time}`);
    return inTime <= new Date("2000-01-01T09:00:00");
  }).length;
  const lateDays = totalDays - onTimeDays;

  const statusData = [
    { name: "On Time", value: onTimeDays },
    { name: "Late", value: lateDays },
  ];
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

  let totalTime: TimeComponents = { hours: 0, minutes: 0, seconds: 0 };

  if (records && records.length > 0) {
    records.forEach((record) => {
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
  const dailyHoursData = records.map((record) => {
    if (record.duration) {
      const time = parseTimeString(record.duration);
      console.log(time);
      return {
        date: format(new Date(record.attendanceDate), "MMM dd"),
        hours: time.hours,
      };
    }
  });
  // Calculate average hours by weekday
  const weekdayData = records.reduce((acc, record) => {
    const date = new Date(record.attendanceDate);
    const weekday = format(date, "EEE");
    if (!acc[weekday]) {
      acc[weekday] = { total: 0, count: 0 };
    }
    if (record.duration) {
      const time = parseTimeString(record.duration);
      const totalHours = time.hours + time.minutes / 60 + time.seconds / 3600;
      acc[weekday].total += totalHours;
      acc[weekday].count += 1;
    }
    return acc;
  }, {} as Record<string, { total: number; count: number }>);

  const averageByWeekday = Object.entries(weekdayData).map(([day, data]) => ({
    day,
    average: data.total / data.count,
  }));

  return (
    <div className="space-y-8">
      {/* Daily Hours Trend */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm ">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Daily Hours Trend
        </h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dailyHoursData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="hours"
                stroke="#4F46E5"
                strokeWidth={2}
                dot={{ fill: "#4F46E5" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Average Hours by Weekday */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Average Hours by Weekday
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={averageByWeekday}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="average" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Attendance Status Distribution */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Attendance Status
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} (${(percent * 100).toFixed(0)}%)`
                  }
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceCharts;
