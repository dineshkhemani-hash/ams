import React, { useState } from 'react';
import { z } from 'zod';
import { Eye, EyeOff, LogIn, UserPlus } from 'lucide-react';
import ErrorPopup from '../components/ErrorPopup';

const userSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    name: z.string().min(2, 'Name must be at least 2 characters').optional(),
});

type FormType = 'login' | 'signup';

const AuthForm: React.FC = () => {
    const [formType, setFormType] = useState<FormType>('login');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const dataToValidate = formType === 'login'
                ? { email: formData.email, password: formData.password }
                : formData;

            userSchema.parse(dataToValidate);

            // Here you would typically make an API call to your backend
            console.log('Form submitted:', formData);

        } catch (err) {
            if (err instanceof z.ZodError) {
                setError(err.errors[0].message);
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-8">
                <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
                    {formType === 'login' ? 'Welcome Back' : 'Create Account'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {formType === 'signup' && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                                placeholder="John Doe"
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-200 transition flex items-center justify-center gap-2"
                    >
                        {formType === 'login' ? (
                            <>
                                <LogIn size={20} />
                                Sign In
                            </>
                        ) : (
                            <>
                                <UserPlus size={20} />
                                Create Account
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <button
                        onClick={() => setFormType(formType === 'login' ? 'signup' : 'login')}
                        className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                    >
                        {formType === 'login'
                            ? "Don't have an account? Sign up"
                            : 'Already have an account? Sign in'}
                    </button>
                </div>
            </div>

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
    );
};

export default AuthForm;