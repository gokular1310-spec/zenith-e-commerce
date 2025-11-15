import React, { useState, useEffect } from 'react';
import { NewProduct, Product } from '../../types';
import { api } from '../../services/mockApiService';
import Button from '../common/Button';
import Spinner from '../common/Spinner';
import { useAuth } from '../../hooks/useAuth';

interface AddProductFormProps {
    onProductAdded: (product: Product) => void;
}

const initialFormState = {
    name: '',
    description: '',
    originalPrice: 0,
    offerPrice: '',
    category: '',
    imageUrl: '',
    stock: 0,
};

const AddProductForm: React.FC<AddProductFormProps> = ({ onProductAdded }) => {
    const { user } = useAuth();
    const [formData, setFormData] = useState(initialFormState);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [categories, setCategories] = useState<string[]>([]);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const cats = await api.getCategories();
                setCategories(cats);
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            }
        };
        fetchCategories();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
                setFormData(prev => ({ ...prev, imageUrl: 'https://placehold.co/600x400/1e40af/white?text=New+Product' }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.imageUrl || !user) {
             setError('Please upload an image.');
             return;
        }

        const offerPriceNum = parseFloat(formData.offerPrice);
        const originalPriceNum = Number(formData.originalPrice);

        if (offerPriceNum && offerPriceNum >= originalPriceNum) {
            setError('Offer price must be less than the original price.');
            return;
        }
        
        setIsSubmitting(true);
        setError('');
        try {
            const newProductData: Omit<NewProduct, 'addedBy'> = {
                name: formData.name,
                description: formData.description,
                category: formData.category,
                imageUrl: formData.imageUrl,
                stock: Number(formData.stock),
                price: (offerPriceNum > 0) ? offerPriceNum : originalPriceNum,
                originalPrice: (offerPriceNum > 0) ? originalPriceNum : undefined,
            };

            const finalFormData: NewProduct = { ...newProductData, addedBy: user.id };
            const newProduct = await api.addProduct(finalFormData);
            onProductAdded(newProduct);
        } catch (error) {
            console.error("Failed to add product:", error);
            setError('Failed to add product.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left Column for Inputs */}
                <div className="md:col-span-2 space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Product Name</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500 text-white" />
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                        <textarea id="description" name="description" value={formData.description} onChange={handleChange} required rows={6} className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500 text-white"></textarea>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="originalPrice" className="block text-sm font-medium text-gray-300 mb-1">Original Price</label>
                            <input type="number" id="originalPrice" name="originalPrice" value={formData.originalPrice} onChange={handleChange} required min="0" step="0.01" className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500 text-white" />
                        </div>
                        <div>
                            <label htmlFor="offerPrice" className="block text-sm font-medium text-gray-300 mb-1">Offer Price (Optional)</label>
                            <input type="number" id="offerPrice" name="offerPrice" value={formData.offerPrice} onChange={handleChange} min="0" step="0.01" placeholder="e.g., 89.99" className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500 text-white" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="stock" className="block text-sm font-medium text-gray-300 mb-1">Stock Quantity</label>
                            <input type="number" id="stock" name="stock" value={formData.stock} onChange={handleChange} required min="0" className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500 text-white" />
                        </div>
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-1">Category</label>
                            <input type="text" list="category-list" id="category" name="category" value={formData.category} onChange={handleChange} required className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500 text-white" />
                            <datalist id="category-list">
                                {categories.map(cat => <option key={cat} value={cat} />)}
                            </datalist>
                        </div>
                    </div>
                </div>

                {/* Right Column for Image Upload */}
                <div className="md:col-span-1">
                     <label className="block text-sm font-medium text-gray-300 mb-1">Product Image</label>
                     <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                            {imagePreview ? (
                                <img src={imagePreview} alt="Product preview" className="mx-auto h-48 w-auto rounded-md" />
                            ) : (
                                <>
                                 <svg className="mx-auto h-12 w-12 text-gray-500" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                 </svg>
                                 <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                </>
                            )}
                            <div className="flex text-sm text-gray-500 justify-center">
                                <label htmlFor="file-upload" className="relative cursor-pointer bg-gray-700 rounded-md font-medium text-primary-400 hover:text-primary-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-800 focus-within:ring-primary-500 px-3 py-1 mt-2">
                                    <span>{imagePreview ? 'Change image' : 'Upload a file'}</span>
                                    <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleImageChange} />
                                </label>
                            </div>
                        </div>
                     </div>
                </div>
            </div>
            
            <div className="mt-8 flex items-center justify-end">
                {error && <p className="text-red-400 mr-4 text-sm">{error}</p>}
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? <><Spinner/> Submitting...</> : 'Add Product'}
                </Button>
            </div>
        </form>
    );
};

export default AddProductForm;