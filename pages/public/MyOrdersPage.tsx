import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Order } from '../../types';
import { api } from '../../services/mockApiService';
import { useAuth } from '../../hooks/useAuth';
import Spinner from '../../components/common/Spinner';
import Button from '../../components/common/Button';

const MyOrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      setLoading(true);
      try {
        const data = await api.getOrdersByCustomerEmail(user.email);
        setOrders(data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user]);

  if (loading) {
    return <div className="flex justify-center items-center h-96"><Spinner /></div>;
  }

  if (orders.length === 0) {
    return (
        <div className="text-center bg-white p-12 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">No Orders Found</h1>
            <p className="text-gray-600 mb-6">You haven't placed any orders with us yet.</p>
            <Link to="/"><Button>Start Shopping</Button></Link>
        </div>
    );
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 md:p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">My Orders</h1>
      <div className="space-y-6">
        {orders.map(order => (
          <div key={order.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b pb-3 mb-3">
              <div>
                <p className="font-semibold text-gray-800">Order ID: <span className="font-bold text-primary-600">{order.id}</span></p>
                <p className="text-sm text-gray-500">Placed on: {new Date(order.date).toLocaleDateString()}</p>
              </div>
              <div className="mt-2 sm:mt-0 text-right">
                <p className="text-lg font-bold text-gray-900">${order.total.toFixed(2)}</p>
                <p className="text-sm font-medium text-gray-600">{order.status}</p>
              </div>
            </div>
            <div className="flex justify-between items-center">
                <div className="flex -space-x-4">
                    {order.items.slice(0, 4).map(item => {
                        const product = {imageUrl: `https://placehold.co/100x100?text=${item.productName.split(' ').join('+')}`}
                        return <img key={item.productId} src={product.imageUrl} alt={item.productName} className="w-12 h-12 rounded-full border-2 border-white object-cover" title={item.productName} />
                    })}
                    {order.items.length > 4 && 
                        <span className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-200 border-2 border-white text-sm font-semibold text-gray-600">+{order.items.length - 4}</span>
                    }
                </div>
                <Link to={`/my-orders/${order.id}`}>
                    <Button variant="secondary">View Details</Button>
                </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrdersPage;
