import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { z } from "zod";
import ErrorPopup from "./ErrorPopup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAttendanceFromAdmin } from "../api";
import { useNavigate } from "react-router";
import { showSuccessToast, showErrorToast } from "../utils/toastUtils";

// Zod schema with custom validation
const editAttendanceSchema = z
  .object({
    id: z.string(),
    attendanceDate: z.string(),
    in_time: z.string(),
    out_time: z.string(),
  })
  .refine((data) => data.out_time > data.in_time, {
    message: "Out time must be greater than In time.",
    path: ["out_time"], // Highlight the `out_time` field in case of error
  });

interface EditAttendanceFormProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Partial<z.infer<typeof editAttendanceSchema>>;
}

const EditAttendanceForm: React.FC<EditAttendanceFormProps> = ({
  isOpen,
  onClose,
  initialData,
}) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: initialData?.id || "",
    attendanceDate: initialData?.attendanceDate || "",
    in_time: initialData?.in_time || "",
    out_time: initialData?.out_time || "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id || "",
        attendanceDate: initialData.attendanceDate || "",
        in_time: initialData.in_time || "",
        out_time: initialData.out_time || "",
      });
    }
  }, [initialData]);

  const updateAttendanceMutation = useMutation({
    mutationFn: updateAttendanceFromAdmin,
    onSuccess: (data) => {
      if (data.status.toLowerCase() === "success") {
        queryClient.invalidateQueries(["attendance-data"]);
        showSuccessToast("Attendance record updated successfully!");
        onClose();
      }
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.message || error?.message || "An error occurred";
      showErrorToast(errorMessage);
    },
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Validate form data using Zod schema
      const validatedData = editAttendanceSchema.parse(formData);
      updateAttendanceMutation.mutate(validatedData);
    } catch (err) {
      if (err instanceof z.ZodError) {
        const errorMessage = err.errors[0].message;
        showErrorToast(errorMessage); // Show toast for validation error
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Edit Attendance
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
              Attendance Date
            </label>
            <input
              type="date"
              value={formData.attendanceDate}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  attendanceDate: e.target.value,
                }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              In Time
            </label>
            <input
              type="time"
              value={formData.in_time}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, in_time: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Out Time
            </label>
            <input
              type="time"
              value={formData.out_time}
              onChange={(e) => {
                const timeWithSeconds = `${e.target.value}:00`; // Append ":00" to the selected time
                setFormData((prev) => ({ ...prev, out_time: timeWithSeconds }));
              }}
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
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAttendanceForm;
