import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../types';
import AddProductForm from '../../components/admin/AddProductForm';

const AdminAddProductPage = () => {
    const navigate = useNavigate();

    const handleProductAdded = (product: Product) => {
        // In a real app, you might show a success toast notification here.
        // For this example, we'll navigate directly back to the product list.
        navigate('/admin/products');
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Product</h2>
            <AddProductForm onProductAdded={handleProductAdded} />
        </div>
    );
};

export default AdminAddProductPage;