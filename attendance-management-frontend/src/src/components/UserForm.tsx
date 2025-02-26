import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { z } from 'zod';
import ErrorPopup from './ErrorPopup';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getAllRoles, updateUserFromAdmin } from '../api';
import { useNavigate } from 'react-router';

const userSchema = z.object({
    id: z.string(),
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    roleId: z.number().min(1).max(3),
});

interface UserFormProps {
    isOpen: boolean;
    onClose: () => void;
    initialData?: Partial<z.infer<typeof userSchema>>;
}

const UserForm: React.FC<UserFormProps> = ({
    isOpen,
    onClose,
    initialData,
}) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        id: initialData?.id || '',
        name: initialData?.name || '',
        email: initialData?.email || '',
        roleId: initialData?.roleId || ''
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                id: initialData.id || '',
                name: initialData.name || '',
                email: initialData.email || '',
                roleId: initialData.roleId || ''
            });
        }
    }, [initialData]);

    const [error, setError] = useState<string | null>(null);
    const { data: allRoles, isLoading, isError } = useQuery({
        queryKey: ["roles"],
        queryFn: getAllRoles,
        refetchOnWindowFocus: false,
        retry: 1,
    });

    const updateUserMutation = useMutation({
        mutationFn: updateUserFromAdmin,
        onSuccess: (data) => {
            console.log(data);
            if (data.status.toLowerCase() === "success") {
                queryClient.invalidateQueries(["user-data"]);
                onClose();

            }
        },
        onError: (error) => {
            try {
                // Parse the error message
                const errorData = JSON.parse(error.message);
                console.log(errorData);
                // Display the validation error message
                setError(errorData.name || "An error occurred");
            } catch (parseError) {
                console.error("Error parsing error message:", parseError);
                setError("An unexpected error occurred");
            }
            // console.log(error.response.data);
            // setError(error.response?.data?.message || error.message);
        }
    });

    if (!isOpen) return null;
    if (isLoading) {
        return <div>Loading.....</div>;
    }
    if (isError) {
        navigate("/login", { replace: true });
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const validationSchema = userSchema.partial();
            const validatedData = validationSchema.parse(formData);
            updateUserMutation.mutate(validatedData);
            console.log(error);
            // onClose();
        } catch (err) {
            if (err instanceof z.ZodError) {
                setError(err.errors[0].message);
            }
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Update User
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
                            Full Name
                        </label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            required
                        />
                    </div>

                    <div className='mb-4'>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Role
                        </label>
                        <select
                            value={formData.roleId}
                            onChange={(e) => setFormData({ ...formData, roleId: parseInt(e.target.value) })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        >
                            {allRoles && allRoles.map((role) => (
                                <option key={role.id} value={role.id}>{role.name}</option>
                            ))}
                        </select>
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

                {error && (
                    <ErrorPopup
                        message={error}
                        onClose={() => setError(null)}
                        position={{
                            top: '20px',
                            right: '20px'
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default UserForm;