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
  roleName: "admin" | "employee" | "user";
}
export interface EmployeeDetail {
  id: string;
  name: string;
  email: string;
  role: "admin" | "employee";
  position?: string;
  phone?: string;
  imageUrl?: string | null;
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
