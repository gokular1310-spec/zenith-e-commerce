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
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        originalPrice: 0,
        offerPrice: '',
        category: '',
        stock: 0,
    });
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

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
                    setImageUrls(data.imageUrls);
                    setFormData({
                        name: data.name,
                        description: data.description,
                        originalPrice: data.originalPrice || data.price,
                        offerPrice: data.originalPrice ? String(data.price) : '',
                        category: data.category,
                        stock: data.stock,
                    });
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
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const newUrls = Array.from(files).map(() => `https://placehold.co/600x400/1e40af/white?text=New+Img`);
            setImageUrls(prev => [...prev, ...newUrls]);
        }
    };

    const handleRemoveImage = (urlToRemove: string) => {
        if (imageUrls.length <= 1) {
            setError('A product must have at least one image.');
            return;
        }
        setError('');
        setImageUrls(prev => prev.filter(url => url !== urlToRemove));
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!product) return;

        const offerPriceNum = parseFloat(formData.offerPrice);
        const originalPriceNum = Number(formData.originalPrice);

        if (offerPriceNum && offerPriceNum >= originalPriceNum) {
            setError('Offer price must be less than the original price.');
            return;
        }
        setError('');
        setIsSubmitting(true);

        try {
            const updatedProductData: Partial<Product> = {
                name: formData.name,
                description: formData.description,
                category: formData.category,
                stock: Number(formData.stock),
                price: (offerPriceNum > 0) ? offerPriceNum : originalPriceNum,
                originalPrice: (offerPriceNum > 0) ? originalPriceNum : undefined,
                imageUrls: imageUrls,
            };
            await api.updateProduct(product.id, updatedProductData);
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
        <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Edit Product</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                 <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                    <input type="text" id="name" name="name" value={formData.name || ''} onChange={handleChange} required className="w-full bg-gray-50 border border-gray-300 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500 text-gray-900" />
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea id="description" name="description" value={formData.description || ''} onChange={handleChange} required rows={6} className="w-full bg-gray-50 border border-gray-300 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500 text-gray-900"></textarea>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="originalPrice" className="block text-sm font-medium text-gray-700 mb-1">Original Price</label>
                        <input type="number" id="originalPrice" name="originalPrice" value={formData.originalPrice || 0} onChange={handleChange} required min="0" step="0.01" className="w-full bg-gray-50 border border-gray-300 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500 text-gray-900" />
                    </div>
                    <div>
                        <label htmlFor="offerPrice" className="block text-sm font-medium text-gray-700 mb-1">Offer Price (Optional)</label>
                        <input type="number" id="offerPrice" name="offerPrice" value={formData.offerPrice || ''} onChange={handleChange} min="0" step="0.01" placeholder="e.g., 7499.00" className="w-full bg-gray-50 border border-gray-300 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500 text-gray-900" />
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <div>
                        <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
                        <input type="number" id="stock" name="stock" value={formData.stock || 0} onChange={handleChange} required min="0" className="w-full bg-gray-50 border border-gray-300 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500 text-gray-900" />
                    </div>
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <input type="text" id="category" name="category" value={formData.category || ''} onChange={handleChange} required className="w-full bg-gray-50 border border-gray-300 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500 text-gray-900" />
                    </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-gray-200">
                    <label className="block text-sm font-medium text-gray-700">Product Images</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {imageUrls.map((url, index) => (
                            <div key={index} className="relative group">
                                <img src={url} alt={`Product image ${index + 1}`} className="w-full h-auto object-cover rounded-md aspect-square" />
                                <button 
                                    type="button" 
                                    onClick={() => handleRemoveImage(url)} 
                                    className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-0.5 h-6 w-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                                    disabled={imageUrls.length <= 1}
                                    title={imageUrls.length <= 1 ? "A product must have at least one image" : "Remove image"}
                                >
                                    &times;
                                </button>
                            </div>
                        ))}
                    </div>
                    <div>
                        <label htmlFor="image-upload" className="block text-sm font-medium text-gray-700 mb-1">Add New Images</label>
                        <input 
                            id="image-upload"
                            type="file" 
                            multiple 
                            onChange={handleImageChange} 
                            accept="image/*"
                            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                        />
                    </div>
                </div>
                
                 <div className="mt-8 flex items-center justify-end">
                    {error && <p className="text-red-500 mr-4 text-sm">{error}</p>}
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? <><Spinner/> Saving...</> : 'Save Changes'}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AdminEditProductPage;