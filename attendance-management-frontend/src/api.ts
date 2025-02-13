import axios, { AxiosError } from "axios"
import { LoginFormData, SignupFormData } from "./types";
const API_URL = import.meta.env.VITE_API_URL;
interface ApiError {
    message: string;
    details?: unknown;
    statusCode?: number;
}
const axiosConfig = {
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
};
const handleApiError = (error: unknown): never => {
    if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiError>;
        throw {
            message: axiosError.response?.data?.message || 'Request failed',
            details: axiosError.response?.data,
            statusCode: axiosError.response?.status
        }
    };
    throw { message: 'Unknown error occurred', details: error };
}
export const loginUser = async (formData: LoginFormData) => {
    try {
        const response = await axios.post(`${API_URL}api/v1/auth/login`, formData, axiosConfig);
        return response.data;
    } catch (error) {
        return handleApiError(error);
    }
}
export const signupUser = async (formData: SignupFormData) => {
    try {
        const response = await axios.post(`${API_URL}api/v1/auth/signup`, formData, axiosConfig);
        return response.data;
    } catch (error) {
        return handleApiError(error);
    }
}
export const checkSession = async () => {
    try {
        const response = await axios.get(`${API_URL}api/v1/auth/check-user`, axiosConfig);
        return response.data;
    } catch (error) {
        console.log(error);
        throw handleApiError(error);
    }
}
export const logout = async () => {
    try {
        const response = await axios.post(`${API_URL}api/v1/auth/logout`, "", axiosConfig);
        return response.data;
    } catch (error) {
        throw handleApiError(error);
    }
}
export const getAllUsers = async () => {
    try {
        const response = await axios.get(`${API_URL}api/v1/admin/users`, axiosConfig);
        return response.data;
    } catch (error) {
        throw handleApiError(error);
    }
}
export const getAllRoles = async () => {
    try {
        const response = await axios.get(`${API_URL}api/v1/admin/roles`, axiosConfig);
        return response.data;
    } catch (error) {
        throw handleApiError(error);
    }
}
export const updateUserFromAdmin = async (formData) => {
    try {
        const response = await axios.patch(`${API_URL}api/v1/admin/user/${formData.id}`, formData, axiosConfig)
        return response.data;
    } catch (error) {
        throw handleApiError(error);
    }
}
export const deleteUserFromAdmin = async (id: string) => {
    try {

        const response = await axios.delete(`${API_URL}api/v1/admin/user/${id}`, axiosConfig);
        return response.data;
    } catch (error) {
        throw handleApiError(error);

    }
}
export const searchUserFromAdmin = async (searchTerm: string) => {
    try {

        const response = await axios.get(`${API_URL}api/v1/admin/search?q=${searchTerm}`, axiosConfig);
        return response.data;
    } catch (error) {
        throw handleApiError(error);

    }
}
export const getDailyAttendance = async () => {
    try {
        const response = await axios.get(`${API_URL}api/v1/admin/attendance/daily`, axiosConfig)
        return response.data;
    } catch (error) {
        throw handleApiError(error);
    }
}

export const submitAttendance = async () => {
    try {
        const response = await axios.post(`${API_URL}api/v1/attendance/in`, {}, axiosConfig);
        return response.data;
    } catch (error) {
        throw handleApiError(error);
    }
}
export const getAllAttendance = async () => {
    try {
        const response = await axios.get(`${API_URL}api/v1/attendance/report?limit=10`, axiosConfig)
        return response.data;
    } catch (error) {
        throw handleApiError(error);
    }
}
export const getAllAttendanceReport = async (year, month) => {
    try {
        const response = await axios.get(`${API_URL}api/v1/attendance/report?type=monthly&year=${year}&month=${month}`, axiosConfig);
        return response.data;
    } catch (error) {
        throw handleApiError(error);
    }
}
export const setOutTimeAttendance = async (data) => {
    // console.log(Date.parse(data.outTime));
    try {
        const out_time = data.outTime + ":00"
        const response = await axios.patch(`${API_URL}api/v1/attendance/out/${data.attendance_id}`, { out_time }, axiosConfig);
        return response.data;
    } catch (error) {
        throw handleApiError(error);
    }
}