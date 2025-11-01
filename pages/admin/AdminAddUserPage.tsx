import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/mockApiService';
import Button from '../../components/common/Button';
import Spinner from '../../components/common/Spinner';

const AdminAddUserPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<'customer' | 'admin' | 'sub-admin'>('customer');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (password.length < 8) {
            setError('Password must be at least 8 characters long.');
            return;
        }
        setIsSubmitting(true);
        try {
            const newUser = await api.addUser({ email, password_bcrypt: password, role });
            if (newUser) {
                navigate('/admin/users');
            } else {
                setError('A user with this email already exists.');
            }
        } catch (err) {
            setError('Failed to create user. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-gray-800 shadow-lg rounded-lg p-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-100 mb-6">Create New User</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                {error && <p className="text-red-400 text-sm text-center bg-red-900/50 p-3 rounded-md">{error}</p>}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500 text-white"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Min. 8 characters"
                        className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500 text-white"
                    />
                </div>
                <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-300 mb-1">Role</label>
                    <select
                        id="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value as 'customer' | 'admin' | 'sub-admin')}
                        className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500 text-white"
                    >
                        <option value="customer">Customer</option>
                        <option value="admin">Admin</option>
                        <option value="sub-admin">Sub-Admin</option>
                    </select>
                </div>
                <div className="flex justify-end pt-4">
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? <><Spinner /> Creating...</> : 'Create User'}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AdminAddUserPage;