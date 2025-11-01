import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Order, OrderStatus } from '../../types';
import { api } from '../../services/mockApiService';
import Spinner from '../../components/common/Spinner';

const getStatusColor = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.PENDING: return 'bg-yellow-500 text-yellow-900';
    case OrderStatus.PROCESSING: return 'bg-blue-500 text-blue-900';
    case OrderStatus.SHIPPED: return 'bg-indigo-500 text-indigo-900';
    case OrderStatus.DELIVERED: return 'bg-green-500 text-green-900';
    case OrderStatus.CANCELLED: return 'bg-red-500 text-red-900';
    default: return 'bg-gray-500 text-gray-900';
  }
};

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await api.getOrders();
        setOrders(data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-full"><Spinner /></div>;
  }

  return (
    <div className="bg-gray-800 shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-100 mb-4">Manage Orders</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-400">
          <thead className="text-xs text-gray-300 uppercase bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3">Order ID</th>
              <th scope="col" className="px-6 py-3">Customer Email</th>
              <th scope="col" className="px-6 py-3">Date</th>
              <th scope="col" className="px-6 py-3">Total</th>
              <th scope="col" className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr 
                key={order.id} 
                className="bg-gray-800 border-b border-gray-700 hover:bg-gray-600 cursor-pointer"
                onClick={() => navigate(`/admin/orders/${order.id}`)}
              >
                <td className="px-6 py-4 font-medium text-white whitespace-nowrap">{order.id}</td>
                <td className="px-6 py-4">{order.customerEmail}</td>
                <td className="px-6 py-4">{order.date}</td>
                <td className="px-6 py-4">${order.total.toFixed(2)}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrdersPage;