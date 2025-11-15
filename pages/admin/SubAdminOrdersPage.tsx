import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Order, OrderStatus } from '../../types';
import { api } from '../../services/mockApiService';
import { useAuth } from '../../hooks/useAuth';
import Spinner from '../../components/common/Spinner';

const getStatusColor = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.PENDING: return 'bg-yellow-100 text-yellow-800';
    case OrderStatus.PROCESSING: return 'bg-blue-100 text-blue-800';
    case OrderStatus.SHIPPED: return 'bg-indigo-100 text-indigo-800';
    case OrderStatus.DELIVERED: return 'bg-green-100 text-green-800';
    case OrderStatus.CANCELLED: return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const SubAdminOrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    const fetchOrders = async () => {
      try {
        const data = await api.getOrders(user.id);
        setOrders(data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user]);

  if (loading) {
    return <div className="flex justify-center items-center h-full"><Spinner /></div>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Manage Your Orders</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
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
                className="bg-white border-b hover:bg-gray-50 cursor-pointer"
                onClick={() => navigate(`/sub-admin/orders/${order.id}`)}
              >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{order.id}</td>
                <td className="px-6 py-4">{order.customerEmail}</td>
                <td className="px-6 py-4">{order.date}</td>
                <td className="px-6 py-4">₹{order.total.toFixed(2)}</td>
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

export default SubAdminOrdersPage;