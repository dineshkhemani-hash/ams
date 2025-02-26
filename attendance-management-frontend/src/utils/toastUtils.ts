// src/utils/toastUtils.js
import { toast, Bounce } from "react-toastify";

export const showSuccessToast = (message) => {
  toast.success(message, {
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

export const showErrorToast = (error) => {
  const errorMessage =
    typeof error === "string"
      ? error
      : error?.response?.data?.message || error?.message || "An error occurred";

  toast.error(errorMessage, {
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
