import React, { useState } from "react";
import { X } from "lucide-react";
import { format } from "date-fns";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setOutTimeAttendance } from "../api";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { showErrorToast, showSuccessToast } from "../utils/toastUtils";
// onSubmit: (data: { attendanceDate: string; in_time: string; out_time: string | null }) => void;
interface AttendanceEntryPopupProps {
  isOpen: boolean;
  onClose: () => void;
  attendance_id: string;
}

const AttendanceEntryPopup: React.FC<AttendanceEntryPopupProps> = ({
  isOpen,
  onClose,
  attendance_id,
}) => {
  const notify = () => {
    toast.success("Attendance marked out successfully!", {
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
    // onClose();
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
  };
  const queryClient = useQueryClient();
  // const [inTime, setInTime] = useState('');
  const [outTime, setOutTime] = useState("");
  const attendanceOutMutation = useMutation({
    mutationFn: setOutTimeAttendance,
    onSuccess: (data) => {
      console.log(data);
      if (data.status.toLowerCase() === "success") {
        queryClient.invalidateQueries({
          queryKey: ["attendance-record"],
        });
        showSuccessToast("Attendance marked out successfully!"); // Use the centralized function
        onClose();
      }
    },
    onError: (error) => {
      console.log(error.message);
      // alert(error.response.data.message)
      showErrorToast(error); // Pass the whole error object
      onClose();
      // notify();
    },
  });
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      attendance_id,
      outTime,
    };
    attendanceOutMutation.mutate(data);
    // onClose();
  };
  // onSubmit({
  //     attendanceDate: format(new Date(), 'yyyy-MM-dd'),
  //     in_time: inTime,
  //     out_time: outTime || null
  // });
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Mark Attendance
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="text"
              value={format(new Date(), "dd MMMM yyyy")}
              disabled
              className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-600"
            />
          </div>

          {/* <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            In Time *
                        </label>
                        <input
                            type="time"
                            required
                            value={inTime}
                            onChange={(e) => setInTime(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                    </div> */}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Out Time
            </label>
            <input
              type="time"
              value={outTime}
              onChange={(e) => setOutTime(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            />
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AttendanceEntryPopup;
