import React, { useEffect, useState, useCallback } from 'react';
import { User } from '../../types';
import { api } from '../../services/mockApiService';
import Spinner from '../../components/common/Spinner';
import Button from '../../components/common/Button';
import EditUserModal from '../../components/admin/EditUserModal';

const AdminUsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.getUsers();
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleDelete = async (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      try {
        const success = await api.deleteUser(userId);
        if (success) {
          // Update state locally by filtering out the deleted user
          setUsers(currentUsers => currentUsers.filter(u => u.id !== userId));
        } else {
           alert('Failed to delete user.');
        }
      } catch (error) {
        console.error("Failed to delete user:", error);
        alert('Failed to delete user.');
      }
    }
  };
  
  const handleToggleBlock = async (user: User) => {
    const newStatus = user.status === 'active' ? 'blocked' : 'active';
    const action = newStatus === 'blocked' ? 'block' : 'unblock';
    if (window.confirm(`Are you sure you want to ${action} this user?`)) {
      try {
        const updatedUser = await api.updateUser(user.id, { status: newStatus });
        if (updatedUser) {
           // Update state locally by replacing the user object
           setUsers(currentUsers => 
             currentUsers.map(u => u.id === updatedUser.id ? updatedUser : u)
           );
        }
      } catch (error) {
        console.error(`Failed to ${action} user:`, error);
        alert(`Failed to ${action} user.`);
      }
    }
  };

  const openEditModal = (user: User) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleUpdateUser = async (updatedUser: User) => {
    try {
      const savedUser = await api.updateUser(updatedUser.id, updatedUser);
      if (savedUser) {
        // Update state locally with the saved user data
        setUsers(currentUsers =>
            currentUsers.map(u => (u.id === savedUser.id ? savedUser : u))
        );
        setIsModalOpen(false);
        setEditingUser(null);
      } else {
        throw new Error("User not found on the server.");
      }
    } catch (error) {
        console.error('Failed to update user:', error);
        alert('Failed to update user.');
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-full"><Spinner /></div>;
  }

  return (
    <>
      <div className="bg-gray-800 shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-100 mb-4">User Management</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-400">
            <thead className="text-xs text-gray-300 uppercase bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3">Email</th>
                <th scope="col" className="px-6 py-3">Role</th>
                <th scope="col" className="px-6 py-3">Status</th>
                <th scope="col" className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} className="bg-gray-800 border-b border-gray-700 hover:bg-gray-600">
                  <td className="px-6 py-4 font-medium text-white whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 capitalize">{user.role}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${user.status === 'active' ? 'bg-green-500 text-green-900' : 'bg-red-500 text-red-900'}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex items-center space-x-2">
                    <Button variant="secondary" className="!px-2 !py-1" onClick={() => openEditModal(user)}>Edit</Button>
                    <Button variant="secondary" className={`!px-2 !py-1 ${user.status === 'active' ? 'bg-yellow-600 hover:bg-yellow-700 text-white' : 'bg-green-600 hover:bg-green-700 text-white'}`} onClick={() => handleToggleBlock(user)}>
                        {user.status === 'active' ? 'Block' : 'Unblock'}
                    </Button>
                    <Button variant="secondary" className="!px-2 !py-1 bg-red-600 hover:bg-red-700 text-white" onClick={() => handleDelete(user.id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isModalOpen && editingUser && (
        <EditUserModal 
            user={editingUser}
            onClose={() => setIsModalOpen(false)}
            onSave={handleUpdateUser}
        />
      )}
    </>
  );
};

export default AdminUsersPage;