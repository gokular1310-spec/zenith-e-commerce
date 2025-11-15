import React from 'react';
import { Link } from 'react-router-dom';
import { useComparison } from '../../hooks/useComparison';
import { useCart } from '../../hooks/useCart';
import Button from '../../components/common/Button';

const ComparePage = () => {
    const { items, removeItem } = useComparison();
    const { addItem: addToCart } = useCart();

    if (items.length < 2) {
        return (
            <div className="text-center bg-white p-12 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Compare Products</h1>
                <p className="text-gray-600 mb-6">Please select at least two products to compare.</p>
                <Link to="/">
                    <Button>Continue Shopping</Button>
                </Link>
            </div>
        );
    }
    
    // Aggregate all unique spec keys from all products
    const allSpecKeys = Array.from(
        new Set(items.flatMap(item => (item.specs ? Object.keys(item.specs) : [])))
    );

    return (
        <div className="bg-white shadow-lg rounded-lg p-6 md:p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Compare Products</h1>
            <div className="overflow-x-auto">
                <table className="w-full min-w-[800px] border-collapse">
                    <thead>
                        {/* Product Header Row */}
                        <tr className="bg-gray-50">
                            <th className="p-4 text-left font-semibold text-gray-600 border-b-2 border-gray-200 w-1/5">Feature</th>
                            {items.map(item => (
                                <th key={item.id} className="p-4 text-center border-b-2 border-gray-200">
                                    <Link to={`/products/${item.id}`} className="block">
                                        <img src={item.imageUrls[0]} alt={item.name} className="w-40 h-auto mx-auto mb-2 rounded-md" />
                                        <h3 className="font-bold text-primary-700 hover:underline">{item.name}</h3>
                                    </Link>
                                    <p className="text-xl font-bold text-gray-800 my-2">${item.price.toFixed(2)}</p>
                                    <div className="flex flex-col gap-2 w-40 mx-auto">
                                        <Button onClick={() => addToCart(item)} className="w-full !text-sm">Add to Cart</Button>
                                        <Button variant="secondary" onClick={() => removeItem(item.id)} className="w-full !text-sm">Remove</Button>
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {/* Specs Rows */}
                        {/* FIX: Explicitly typing `key` as a string resolves the TypeScript error where it was being inferred as `unknown`. */}
                        {allSpecKeys.map((key: string) => (
                            <tr key={key} className="border-b border-gray-100 even:bg-gray-50/50">
                                <td className="p-4 font-semibold text-gray-700">{key}</td>
                                {items.map(item => (
                                    <td key={item.id} className="p-4 text-center text-gray-600">
                                        {item.specs?.[key] || '-'}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ComparePage;