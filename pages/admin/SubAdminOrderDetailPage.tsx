import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Order, OrderStatus, Product } from '../../types';
import { api } from '../../services/mockApiService';
import { useAuth } from '../../hooks/useAuth';
import Spinner from '../../components/common/Spinner';
import Button from '../../components/common/Button';

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

const SubAdminOrderDetailPage = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [order, setOrder] = useState<Order | null | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [userProducts, setUserProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (!orderId || !user) {
      setLoading(false);
      return;
    }
    const fetchData = async () => {
      setLoading(true);
      try {
        const [orderData, productsData] = await Promise.all([
          api.getOrderById(orderId),
          api.getProducts(user.id)
        ]);
        
        const userProductIds = new Set(productsData.map(p => p.id));
        const isOrderRelevant = orderData?.items.some(item => userProductIds.has(item.productId));

        if (isOrderRelevant) {
          setOrder(orderData);
          setUserProducts(productsData);
        } else {
          setOrder(null); // Deny access
          navigate('/sub-admin/orders');
        }
      } catch (error) {
        console.error("Failed to fetch order details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [orderId, user, navigate]);

  const handleStatusUpdate = async (newStatus: OrderStatus) => {
    if (!order) return;
    try {
        const updatedOrder = await api.updateOrderStatus(order.id, newStatus);
        if (updatedOrder) {
            setOrder(updatedOrder);
        }
    } catch (error) {
        console.error("Failed to update order status:", error);
        alert("Failed to update status.");
    }
  };

  const handleDelete = async () => {
    if (!order) return;
    if (window.confirm('Are you sure you want to permanently delete this order? This will affect all vendors involved.')) {
        try {
            const success = await api.deleteOrder(order.id);
            if (success) {
                navigate('/sub-admin/orders');
            } else {
                alert('Failed to delete order.');
            }
        } catch (error) {
            console.error("Failed to delete order:", error);
            alert('Failed to delete order.');
        }
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-full"><Spinner /></div>;
  }

  if (!order) {
    return <div className="text-center text-xl text-gray-400">Order not found or access denied.</div>;
  }
  
  const userProductIdsInOrder = new Set(userProducts.map(p => p.id));

  return (
    <div className="bg-gray-800 shadow-lg rounded-lg p-6 text-gray-300">
      <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Order Details</h2>
          <p className="text-primary-400">{order.id}</p>
        </div>
        <Link to="/sub-admin/orders" className="text-sm text-primary-400 hover:underline">&larr; Back to Orders</Link>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
          <Button onClick={() => handleStatusUpdate(OrderStatus.SHIPPED)} disabled={order.status === OrderStatus.SHIPPED || order.status === OrderStatus.DELIVERED}>Mark as Shipped</Button>
          <Button onClick={() => handleStatusUpdate(OrderStatus.DELIVERED)} disabled={order.status === OrderStatus.DELIVERED}>Mark as Delivered</Button>
          <Button onClick={handleDelete} variant="secondary" className="bg-red-600 hover:bg-red-700 text-white">Remove Order</Button>
      </div>

      {/* Main Details */}
      <div className="md:col-span-2 bg-gray-700 p-4 rounded-lg mb-6">
        <h3 className="font-semibold text-lg text-white mb-4">Order Summary</h3>
        <div className="space-y-2">
            <div className="flex justify-between"><span className="font-medium">Order Date:</span> <span>{new Date(order.date).toLocaleDateString()}</span></div>
            <div className="flex justify-between items-center">
                <span className="font-medium">Status:</span> 
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>{order.status}</span>
            </div>
             <div className="flex justify-between text-xl font-bold pt-2 border-t border-gray-600 mt-2 text-white">
                <span>Total:</span> <span>${order.total.toFixed(2)}</span>
            </div>
        </div>
      </div>
      
      {/* Product List */}
      <div className="mt-6">
        <h3 className="font-semibold text-lg text-white mb-2">Items in Order</h3>
        <p className="text-sm text-gray-400 mb-4">You can only see and manage items that you have listed.</p>
        <div className="overflow-x-auto bg-gray-700 rounded-lg">
            <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-300 uppercase bg-gray-600">
                    <tr>
                        <th scope="col" className="px-6 py-3">Product Name</th>
                        <th scope="col" className="px-6 py-3">Quantity</th>
                        <th scope="col" className="px-6 py-3">Price</th>
                        <th scope="col" className="px-6 py-3">Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    {order.items.map(item => (
                        <tr key={item.productId} className={`border-b border-gray-600 ${!userProductIdsInOrder.has(item.productId) && 'opacity-50'}`}>
                            <td className="px-6 py-4 font-medium text-white">{item.productName} {!userProductIdsInOrder.has(item.productId) && '(Other Vendor)'}</td>
                            <td className="px-6 py-4">{item.quantity}</td>
                            <td className="px-6 py-4">${item.price.toFixed(2)}</td>
                            <td className="px-6 py-4">${(item.quantity * item.price).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

export default SubAdminOrderDetailPage;