import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { AdminSearchResults } from '../../types';
import { api } from '../../services/mockApiService';
import { useAuth } from '../../hooks/useAuth';
import Spinner from '../../components/common/Spinner';

const AdminSearchResultsPage = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');
    const { user } = useAuth();

    const [results, setResults] = useState<AdminSearchResults | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const performSearch = async () => {
            if (!query || !user) {
                setLoading(false);
                setResults(null);
                return;
            }
            setLoading(true);
            try {
                const searchResults = await api.adminSearch(query, user);
                setResults(searchResults);
            } catch (error) {
                console.error("Failed to perform admin search:", error);
                setResults(null);
            } finally {
                setLoading(false);
            }
        };

        performSearch();
    }, [query, user]);
    
    const basePath = user?.role === 'sub-admin' ? '/sub-admin' : '/admin';

    if (loading) {
        return <div className="flex justify-center items-center h-full"><Spinner /></div>;
    }

    if (!query) {
        return <div className="text-gray-400 text-center">Please enter a search term in the header.</div>;
    }
    
    const totalResults = (results?.products.length || 0) + (results?.orders.length || 0) + (results?.users.length || 0);

    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">Search Results for "{query}"</h2>
            
            {totalResults === 0 ? (
                <div className="text-gray-400 text-center bg-gray-800 p-8 rounded-lg">No results found.</div>
            ) : (
                <div className="space-y-8">
                    {/* Products */}
                    {results?.products && results.products.length > 0 && (
                        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                            <h3 className="text-xl font-bold text-white mb-4">Products ({results.products.length})</h3>
                            <ul className="divide-y divide-gray-700">
                                {results.products.map(product => (
                                    <li key={product.id} className="py-3">
                                        <Link to={`${basePath}/products/edit/${product.id}`} className="flex items-center gap-4 hover:bg-gray-700 p-2 rounded-md transition-colors">
                                            <img src={product.imageUrls[0]} alt={product.name} className="w-12 h-12 object-cover rounded-md" />
                                            <div>
                                                <p className="font-semibold text-white">{product.name}</p>
                                                <p className="text-sm text-gray-400">ID: {product.id} | Stock: {product.stock}</p>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Orders */}
                    {results?.orders && results.orders.length > 0 && (
                        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                            <h3 className="text-xl font-bold text-white mb-4">Orders ({results.orders.length})</h3>
                             <ul className="divide-y divide-gray-700">
                                {results.orders.map(order => (
                                    <li key={order.id} className="py-3">
                                        <Link to={`${basePath}/orders/${order.id}`} className="block hover:bg-gray-700 p-2 rounded-md transition-colors">
                                            <p className="font-semibold text-white">Order ID: {order.id}</p>
                                            <p className="text-sm text-gray-400">{order.customerEmail} | Total: ${order.total.toFixed(2)}</p>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    
                    {/* Users (Admin only) */}
                    {user?.role === 'admin' && results?.users && results.users.length > 0 && (
                         <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                            <h3 className="text-xl font-bold text-white mb-4">Users ({results.users.length})</h3>
                             <ul className="divide-y divide-gray-700">
                                {results.users.map(u => (
                                    <li key={u.id} className="py-3">
                                       <div className="hover:bg-gray-700 p-2 rounded-md transition-colors">
                                            <p className="font-semibold text-white">{u.email}</p>
                                            <p className="text-sm text-gray-400 capitalize">Role: {u.role} | Status: {u.status}</p>
                                       </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AdminSearchResultsPage;