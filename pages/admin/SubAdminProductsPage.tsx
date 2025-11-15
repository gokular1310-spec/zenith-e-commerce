import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Product } from '../../types';
import { api } from '../../services/mockApiService';
import Spinner from '../../components/common/Spinner';
import Button from '../../components/common/Button';
import { useAuth } from '../../hooks/useAuth';

const SubAdminProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();

  const fetchProducts = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const data = await api.getProducts(user.id);
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchProducts();
  }, [user]);

  const handleDeleteProduct = async (productId: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await api.deleteProduct(productId);
        fetchProducts(); // Refresh list after deleting
      } catch (error) {
        console.error("Failed to delete product:", error);
        alert("Failed to delete product.");
      }
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-full"><Spinner /></div>;
  }

  return (
    <div className="bg-gray-800 shadow-lg rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-100">My Products</h2>
        <Link to="/sub-admin/products/new">
            <Button>Add New Product</Button>
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-400">
          <thead className="text-xs text-gray-300 uppercase bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3">Product Name</th>
              <th scope="col" className="px-6 py-3">Category</th>
              <th scope="col" className="px-6 py-3">Price</th>
              <th scope="col" className="px-6 py-3">Stock</th>
              <th scope="col" className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id} className="bg-gray-800 border-b border-gray-700 hover:bg-gray-600">
                <td className="px-6 py-4 font-medium text-white whitespace-nowrap flex items-center">
                    <img src={product.imageUrls[0]} alt={product.name} className="w-10 h-10 rounded-full mr-4 object-cover" />
                    {product.name}
                </td>
                <td className="px-6 py-4">{product.category}</td>
                <td className="px-6 py-4">${product.price.toFixed(2)}</td>
                <td className="px-6 py-4">{product.stock}</td>
                <td className="px-6 py-4 flex items-center space-x-2">
                    <Button variant="secondary" className="!px-2 !py-1" onClick={() => navigate(`/sub-admin/products/edit/${product.id}`)}>Edit</Button>
                    <Button variant="secondary" className="!px-2 !py-1 bg-red-600 hover:bg-red-700 text-white" onClick={() => handleDeleteProduct(product.id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubAdminProductsPage;