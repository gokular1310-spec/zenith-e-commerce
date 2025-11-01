import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Product } from '../../types';
import { api } from '../../services/mockApiService';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/common/Button';
import Spinner from '../../components/common/Spinner';

const AdminEditProductPage = () => {
    const { productId } = useParams<{ productId: string }>();
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuth();
    
    const [product, setProduct] = useState<Product | null>(null);
    const [formData, setFormData] = useState<Partial<Product>>({});
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const basePath = location.pathname.startsWith('/sub-admin') ? '/sub-admin' : '/admin';

    useEffect(() => {
        if (!productId) return;
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const data = await api.getProductById(parseInt(productId, 10));
                if (data && user) {
                    // Security check for sub-admins
                    if (user.role === 'sub-admin' && data.addedBy !== user.id) {
                         navigate('/sub-admin/products'); // Redirect if not their product
                         return;
                    }
                    setProduct(data);
                    setFormData(data);
                } else {
                    navigate(`${basePath}/products`);
                }
            } catch (error) {
                console.error("Failed to fetch product:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [productId, user, navigate, basePath]);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? parseFloat(value) || 0 : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!product) return;
        setIsSubmitting(true);
        try {
            await api.updateProduct(product.id, formData);
            navigate(`${basePath}/products`);
        } catch (error) {
            console.error("Failed to update product:", error);
            alert("Failed to update product.");
        } finally {
            setIsSubmitting(false);
        }
    };
    
    if (loading) {
        return <div className="flex justify-center items-center h-full"><Spinner /></div>;
    }

    if (!product) {
        return <p className="text-gray-400">Product not found.</p>;
    }
    
    return (
        <div className="bg-gray-800 shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-100 mb-6">Edit Product</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                 <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Product Name</label>
                    <input type="text" id="name" name="name" value={formData.name || ''} onChange={handleChange} required className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500 text-white" />
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                    <textarea id="description" name="description" value={formData.description || ''} onChange={handleChange} required rows={6} className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500 text-white"></textarea>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-300 mb-1">Price</label>
                        <input type="number" id="price" name="price" value={formData.price || 0} onChange={handleChange} required min="0" step="0.01" className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500 text-white" />
                    </div>
                    <div>
                        <label htmlFor="stock" className="block text-sm font-medium text-gray-300 mb-1">Stock Quantity</label>
                        <input type="number" id="stock" name="stock" value={formData.stock || 0} onChange={handleChange} required min="0" className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500 text-white" />
                    </div>
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-1">Category</label>
                        <input type="text" id="category" name="category" value={formData.category || ''} onChange={handleChange} required className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500 text-white" />
                    </div>
                </div>
                 <div className="mt-8 flex items-center justify-end">
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? <><Spinner/> Saving...</> : 'Save Changes'}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AdminEditProductPage;