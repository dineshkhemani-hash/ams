import { useMemo } from "react";
import { AttendanceRecord } from "../types";

interface TimeComponents {
  hours: number;
  minutes: number;
  seconds: number;
}

export const useAttendanceStats = (attendanceRecords: AttendanceRecord[]) => {
  const stats = useMemo(() => {
    // Get current date in YYYY-MM-DD format
    const getCurrentDate = () => {
      const today = new Date();
      return today.toISOString().split("T")[0];
    };

    // Parse time string into components
    const parseTimeString = (timeString: string): TimeComponents => {
      if (!timeString?.match(/^(\d{1,2}):(\d{2})(:(\d{2}))?$/)) {
        return { hours: 0, minutes: 0, seconds: 0 };
      }

      const parts = timeString.split(":");
      return {
        hours: Number(parts[0]),
        minutes: Number(parts[1]),
        seconds: parts.length === 3 ? Number(parts[2]) : 0,
      };
    };

    // Format time components into string
    const formatTime = (time: TimeComponents): string => {
      const { hours, minutes, seconds } = time;
      if (hours === 0 && minutes === 0 && seconds === 0) return "0:00";
      return `${hours}:${minutes.toString().padStart(2, "0")}`;
    };

    // Calculate average time
    const calculateAverageTime = (
      totalTime: TimeComponents,
      records: number
    ): TimeComponents => {
      if (!records) return { hours: 0, minutes: 0, seconds: 0 };

      const totalMinutes =
        totalTime.hours * 60 + totalTime.minutes + totalTime.seconds / 60;
      const averageMinutes = totalMinutes / records;

      return {
        hours: Math.floor(averageMinutes / 60),
        minutes: Math.floor(averageMinutes % 60),
        seconds: 0,
      };
    };

    // Calculate all stats
    const todayDate = getCurrentDate();
    const todaysAttendance = attendanceRecords.find(
      (record) => record.attendanceDate === todayDate
    );

    let totalTime: TimeComponents = { hours: 0, minutes: 0, seconds: 0 };
    let validRecordsCount = 0;

    attendanceRecords.forEach((record) => {
      if (record.duration) {
        try {
          const time = parseTimeString(record.duration);
          totalTime.hours += time.hours;
          totalTime.minutes += time.minutes;
          totalTime.seconds += time.seconds;
          validRecordsCount++;
        } catch (error) {
          console.error(`Error parsing duration: ${record.duration}`, error);
        }
      }
    });

    // Handle time component overflow
    totalTime.minutes += Math.floor(totalTime.seconds / 60);
    totalTime.seconds = totalTime.seconds % 60;
    totalTime.hours += Math.floor(totalTime.minutes / 60);
    totalTime.minutes = totalTime.minutes % 60;

    const averageTime = calculateAverageTime(totalTime, validRecordsCount);

    const presentDays = attendanceRecords.filter(
      (record) => record.status === "FULL_DAY"
    ).length;

    const halfDays = attendanceRecords.filter(
      (record) => record.status === "HALF_DAY"
    ).length;

    return {
      todaysAttendance,
      totalTime: formatTime(totalTime),
      averageTime: formatTime(averageTime),
      presentDays,
      halfDays,
      totalDays: attendanceRecords.length,
    };
  }, [attendanceRecords]);

  return stats;
};
