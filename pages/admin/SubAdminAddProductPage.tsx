import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../types';
import AddProductForm from '../../components/admin/AddProductForm';

const SubAdminAddProductPage = () => {
    const navigate = useNavigate();

    const handleProductAdded = (product: Product) => {
        navigate('/sub-admin/products');
    };

    return (
        <div className="bg-gray-800 shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-100 mb-6">Add New Product</h2>
            <AddProductForm onProductAdded={handleProductAdded} />
        </div>
    );
};

export default SubAdminAddProductPage;