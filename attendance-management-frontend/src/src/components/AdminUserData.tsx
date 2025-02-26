import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { deleteUserFromAdmin, getAllUsers, searchUserFromAdmin } from "../api";
import React, { useState } from "react";
import { User } from "../types";
import { Pencil, Trash2 } from "lucide-react";
import UserForm from "./UserForm";
import GeneralPopup from "./GeneralPopup";

interface AdminUserDataProps {
    debouncedValue: string;
}
export const AdminUserData: React.FC<AdminUserDataProps> = ({ debouncedValue }) => {
    console.log(debouncedValue);
    const navigate = useNavigate();
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isUserFormOpen, setIsUserFormOpen] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const queryClient = useQueryClient();
    const { data: userData, isLoading, isError, refetch: refetchUsers } = useQuery<User[]>({
        queryKey: ["user-data"],
        queryFn: getAllUsers,
        refetchOnWindowFocus: false,
        retry: 1,
    })
    const { data: searchData, isLoading: searchLoading, isError: searchingError } = useQuery<User[]>({
        queryKey: ["search-data", debouncedValue],
        queryFn: () => searchUserFromAdmin(debouncedValue),
        refetchOnWindowFocus: false,
        retry: 1,
        enabled: !!debouncedValue
    });
    const deleteMutation = useMutation({
        mutationKey: ["delete-user-admin"],
        mutationFn: deleteUserFromAdmin,
        onSuccess: async (data) => {
            console.log(data);
            if (data.status.toLowerCase() === "success") {
                queryClient.invalidateQueries(["user-data"])
                queryClient.cancelQueries(["user-data"])
                await refetchUsers()
            }
            // if (data.status.toLowerCase() === "success") {
            //     if (data.data.roleName.toLowerCase() == "admin") {
            //         navigate("/admin-dashboard");
            //     } else {
            //         navigate("/dashboard");
            //     }
            // }
        },
        onError: (error: any) => {
            console.log(error);
            setError(error.response?.data?.message || error.message);
        },
        onSettled: () => {
            queryClient.invalidateQueries(["user-data"]);
        }
    })
    if (isLoading || searchLoading) {
        return <div>Loading.....</div>
    }
    if (isError || searchingError) {
        navigate("/login", { replace: true })
    }

    const handleCreateUser = async (userData: any) => {
        try {
            // Replace with your API call
            console.log('Creating user:', userData);
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    const handleUpdateUser = async (userData: any) => {
        try {
            // Replace with your API call
            console.log('Updating user:', userData);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const handleDeleteUser = async (userId: string) => {
        try {
            // Replace with your API call
            deleteMutation.mutate(userId)

            console.log('Deleting user:', userId);
        } catch (error) {
            console.error('Error deleting user:', error);
        }
        // if (window.confirm('Are you sure you want to remove this user?')) {

        // }
    };
    const dataToDisplay = debouncedValue ? searchData : userData;
    return (
        <>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50  dark:bg-gray-900">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                Role
                            </th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {dataToDisplay && dataToDisplay.length > 0 ? dataToDisplay.map((user) => (
                            <tr key={user.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{user.name}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {/* <span className={`px-4 inline-flex text-xs leading-5 font-semibold rounded-full ${user.roleName === 'admin'
                                        ? 'bg-purple-100 text-purple-800'
                                        : 'bg-green-100 text-green-800'
                                        }`}>
                                        {user.roleName}
                                    </span> */}
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.roleName === 'admin'
                                        ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                                        : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                        }`}>
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
                                        onClick={(prev) => setIsPopupOpen(!false)}
                                        className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </td>
                                {isPopupOpen && <GeneralPopup message="Are you sure you want to delete the user?" onClose={() => setIsPopupOpen(false)}
                                    handleAction={() => {
                                        handleDeleteUser(user.id)
                                        setIsPopupOpen(false)
                                    }} />}
                            </tr>
                        )) : <>
                            <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center p-4">
                                <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-8">
                                    <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
                                        Error
                                    </h2>
                                    <p className="text-center text-red-500 my-10">Sorry no user found.</p>
                                    <button
                                        onClick={() => navigate("/dashboard")}
                                        className="justify-self-center m-auto w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
                                    >
                                        Go to Dashboard
                                    </button>
                                </div>
                            </div>
                        </>}
                    </tbody>
                </table>
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

        </>
    )
}