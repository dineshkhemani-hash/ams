import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { deleteUserFromAdmin, getAllUsers, searchUserFromAdmin } from "../api";
import React, { useCallback, useMemo, useState } from "react";
import { User } from "../types";
import { Pencil, Trash2 } from "lucide-react";
import UserForm from "./UserForm";
import GeneralPopup from "./GeneralPopup";
import { useDebouncedSearch } from "../hooks/useDebouncedSearch";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "../error/ErrorMessage";

interface AdminUserDataProps {
  debouncedValue: string;
}
export const AdminUserData: React.FC<AdminUserDataProps> = ({
  debouncedValue,
}) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // State management
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const [isUserFormOpen, setIsUserFormOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const recordsPerPage = 10;
  // Queries
  const {
    data: userData,
    isLoading,
    isError,
    refetch: refetchUsers,
  } = useQuery<User[]>({
    queryKey: ["user-data"],
    queryFn: getAllUsers,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const {
    data: searchData,
    isLoading: searchLoading,
    isError: searchingError,
  } = useQuery<User[]>({
    queryKey: ["search-data", debouncedValue],
    queryFn: () => searchUserFromAdmin(debouncedValue),
    refetchOnWindowFocus: false,
    retry: 1,
    enabled: !!debouncedValue,
  });
  const deleteMutation = useMutation({
    mutationKey: ["delete-user-admin"],
    mutationFn: deleteUserFromAdmin,
    onSuccess: async (data) => {
      if (data.status.toLowerCase() === "success") {
        await queryClient.invalidateQueries(["user-data"]);
        setIsPopupOpen(false);
        setUserToDelete(null);
        // queryClient.cancelQueries(["user-data"]);
        // await refetchUsers();
      }
    },
    onError: (error: any) => {
      console.log(error);
      setError(error.response?.data?.message || error.message);
      setIsPopupOpen(false);
    },
  });
  // Handle delete confirmation
  const handleDeleteConfirmation = useCallback((userId: string) => {
    setUserToDelete(userId);
    setIsPopupOpen(true);
  }, []);

  // Handle actual deletion
  const handleDeleteUser = useCallback(() => {
    if (userToDelete) {
      deleteMutation.mutate(userToDelete);
    }
  }, [userToDelete, deleteMutation]);
  // const handleDeleteUser = async (userId: string) => {
  //     try {
  //         // Replace with your API call
  //         deleteMutation.mutate(userId)

  //         console.log('Deleting user:', userId);
  //     } catch (error) {
  //         console.error('Error deleting user:', error);
  //     }
  //     // if (window.confirm('Are you sure you want to remove this user?')) {

  //     // }
  // };

  //   const dataToDisplay = debouncedValue ? searchData : userData;
  //pagination state
  const [currentPage, setCurrentPage] = useState(1);
  //   const recordsPerPage = 10;
  //   let currentUsers;
  //   let totalPages;
  //   if (dataToDisplay) {
  //     //calculate pagination values
  //     const indexOfLastRecord = currentPage * recordsPerPage;
  //     const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  //     currentUsers = dataToDisplay!.slice(indexOfFirstRecord, indexOfLastRecord);
  //     totalPages = Math.ceil(dataToDisplay!.length / recordsPerPage);
  //   }
  // Determine which data to display and handle pagination

  const { displayData, totalPages } = useMemo(() => {
    const dataToUse = debouncedValue ? searchData : userData;

    if (!dataToUse) {
      return { displayData: [], totalPages: 0 };
    }

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const slicedData = dataToUse.slice(indexOfFirstRecord, indexOfLastRecord);
    const calculatedTotalPages = Math.ceil(dataToUse.length / recordsPerPage);

    return {
      displayData: slicedData,
      totalPages: calculatedTotalPages,
    };
  }, [debouncedValue, searchData, userData, currentPage, recordsPerPage]);
  //handle page change
  const handlePageChange = useCallback((pageNumber: number) => {
    setCurrentPage(pageNumber);
  }, []);
  //calculate what page numbers to show
  function renderPageNumbers() {
    const pageNumbers = [];
    const maxPagesToShow = 5; //at most 5 pages to display
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    //adjust start page if we are near the end
    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  }
  if (isLoading || searchLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <LoadingSpinner size="large" />
      </div>
    );
  }
  if (isError || searchingError) {
    return (
      <ErrorMessage
        title="Authentication Error"
        message="You are not authorized to view this page."
        buttonText="Go to Login"
        redirectPath="/login"
      />
    );
  }
  // No data state
  if (!displayData || displayData.length === 0) {
    return (
      <ErrorMessage
        message="No users found matching your criteria."
        buttonText="Go to Dashboard"
        redirectPath="/dashboard"
      />
    );
  }
  return (
    <>
      <div className="overflow-x-auto">
        {displayData && displayData.length > 0 ? (
          <>
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50  dark:bg-gray-900">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    Role
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              {displayData.map((user) => (
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {user.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {user.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {/* <span className={`px-4 inline-flex text-xs leading-5 font-semibold rounded-full ${user.roleName === 'admin'
                                        ? 'bg-purple-100 text-purple-800'
                                        : 'bg-green-100 text-green-800'
                                        }`}>
                                        {user.roleName}
                                    </span> */}
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.roleName === "admin"
                            ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                            : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        }`}
                      >
                        {user.roleName}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setIsUserFormOpen(true);
                        }}
                        className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 mr-4  dark:hover:text-indigo-300"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        // onClick={(prev) => setIsPopupOpen(!false)}
                        onClick={() => handleDeleteConfirmation(user.id)}
                        aria-label={`Delete ${user.name}`}
                        className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
            <div className="flex items-center justify-center space-x-2 mt-6">
              {/* Previous page button */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 disabled:opacity-50"
              >
                Prev
              </button>

              {/* First page button(if not in view) */}
              {renderPageNumbers()[0] > 1 && (
                <>
                  <button
                    onClick={() => handlePageChange(1)}
                    disabled={currentPage === 1}
                    className={`w-8 h-8 flex items-center justify-center rounded-lg ${
                      currentPage === 1
                        ? "bg-gray-900/10 dark:bg-gray-100/10 text-gray-900 dark:text-gray-100 font-medium"
                        : "hover:bg-gray-900/5 dark:hover:bg-gray-100/5 text-gray-600 dark:text-gray-400"
                    }`}
                    // className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-900/10 dark:bg-gray-100/10 text-gray-900 dark:text-gray-100"
                  >
                    1
                  </button>
                  {renderPageNumbers()[0] > 2 && (
                    <span className="px-2 text-gray-600 dark:text-gray-400">
                      ...
                    </span>
                  )}
                </>
              )}
              {/* Page number buttons */}
              {renderPageNumbers().map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`w-8 h-8 flex items-center justify-center rounded-lg ${
                    currentPage === pageNum
                      ? "bg-gray-900/10 dark:bg-gray-100/10 text-gray-900 dark:text-gray-100 font-medium"
                      : "hover:bg-gray-900/5 dark:hover:bg-gray-100/5 text-gray-600 dark:text-gray-400"
                  }`}
                >
                  {pageNum}
                </button>
              ))}
              {/* again last check for if last page button is not in view */}
              {renderPageNumbers()[renderPageNumbers().length - 1] <
                totalPages && (
                <>
                  {renderPageNumbers()[renderPageNumbers().length - 1] <
                    totalPages - 1 && (
                    <span className="text-gray-500 dark:text-gray-400">
                      ...
                    </span>
                  )}
                  <button
                    onClick={() => handlePageChange(totalPages)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-900/5 dark:hover:bg-gray-100/5 text-gray-600 dark:text-gray-400"
                  >
                    {totalPages}
                  </button>
                </>
              )}
              {/* Next page button */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 disabled:opacity-50"
              >
                Next
              </button>
            </div>
            {/* Current page indicator */}
            <div className="text-center my-4 text-sm text-gray-500 dark:text-gray-400">
              Page {currentPage} of {totalPages}
            </div>
          </>
        ) : (
          <>
            <div className=" min-w-full bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center p-4">
              <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-8">
                <h2 className="text-3xl font-bold text-center mb-8 p-4 text-gray-800">
                  Error
                </h2>
                <p className="text-center text-red-500 my-10">
                  Sorry no user found.
                </p>
                <button
                  onClick={() => navigate("/dashboard")}
                  className="justify-self-center m-auto w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
                >
                  Go to Dashboard
                </button>
              </div>
            </div>
          </>
        )}

        {/* Pagination controls */}
      </div>
      <UserForm
        isOpen={isUserFormOpen}
        onClose={() => {
          setIsUserFormOpen(false);
          setSelectedUser(null);
        }}
        // onSubmit={selectedUser ? handleUpdateUser : handleCreateUser}
        initialData={selectedUser || undefined}
        // mode={selectedUser ? 'update' : 'create'}
      />
      {isPopupOpen && (
        <GeneralPopup
          message="Are you sure you want to delete the user?"
          onClose={() => {
            setIsPopupOpen(false);
            setUserToDelete(null);
          }}
          handleAction={handleDeleteUser}
        />
      )}
    </>
  );
};
