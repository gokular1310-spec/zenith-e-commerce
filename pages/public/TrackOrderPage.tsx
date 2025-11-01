import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Order, OrderStatus } from '../../types';
import { api } from '../../services/mockApiService';
import Spinner from '../../components/common/Spinner';

const getStatusIndex = (status: OrderStatus) => {
    const order = [OrderStatus.PENDING, OrderStatus.PROCESSING, OrderStatus.SHIPPED, OrderStatus.DELIVERED];
    return order.indexOf(status);
};

const TrackingTimeline = ({ status }: { status: OrderStatus }) => {
    const statuses = [
      { name: OrderStatus.PENDING, description: "Your order has been placed." },
      { name: OrderStatus.PROCESSING, description: "Your order is being processed." },
      { name: OrderStatus.SHIPPED, description: "Your order has shipped." },
      { name: OrderStatus.DELIVERED, description: "Your order has been delivered." }
    ];
    const currentIndex = getStatusIndex(status);

    return (
        <ol className="relative border-l border-gray-200 dark:border-gray-700 ml-4">
            {statuses.map((s, index) => (
                <li key={s.name} className={`mb-10 ml-6 ${index > currentIndex ? 'opacity-40' : ''}`}>
                    <span className={`absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 ring-8 ring-white ${index <= currentIndex ? 'bg-primary-600' : 'bg-gray-400'}`}>
                       {index <= currentIndex && <svg className="w-2.5 h-2.5 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20"><path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4Z"/><path d="M0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/></svg>}
                    </span>
                    <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900">{s.name}</h3>
                    <p className="block mb-2 text-sm font-normal leading-none text-gray-500">{s.description}</p>
                </li>
            ))}
        </ol>
    );
};


const TrackOrderPage = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<Order | null | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) return;
    const fetchOrder = async () => {
      setLoading(true);
      try {
        const data = await api.getOrderById(orderId);
        setOrder(data);
      } catch (error) {
        console.error("Failed to fetch order:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  if (loading) {
    return <div className="flex justify-center items-center h-96"><Spinner /></div>;
  }

  if (!order) {
    return <div className="text-center text-xl">Order not found.</div>;
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Order Details</h1>
        <p className="text-gray-500">Order ID: <span className="font-medium text-primary-600">{order.id}</span></p>
        <p className="text-gray-500">Tracking Number: <span className="font-medium text-gray-700">{order.trackingNumber}</span></p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Tracking Status</h2>
            <TrackingTimeline status={order.status} />
        </div>
        <div className="lg:col-span-2 space-y-8">
            <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Items Ordered</h2>
                <div className="divide-y divide-gray-200 border rounded-lg">
                    {order.items.map(item => (
                        <div key={item.productId} className="p-4 flex justify-between items-center">
                            <div>
                                <p className="font-medium text-gray-800">{item.productName}</p>
                                <p className="text-sm text-gray-500">Qty: {item.quantity} @ ${item.price.toFixed(2)}</p>
                            </div>
                            <p className="font-semibold text-gray-900">${(item.quantity * item.price).toFixed(2)}</p>
                        </div>
                    ))}
                    <div className="p-4 flex justify-between items-center bg-gray-50">
                        <p className="text-lg font-bold text-gray-900">Total</p>
                        <p className="text-lg font-bold text-gray-900">${order.total.toFixed(2)}</p>
                    </div>
                </div>
            </div>
            <div>
                 <h2 className="text-xl font-semibold text-gray-800 mb-4">Shipping Address</h2>
                 <div className="bg-gray-50 p-4 rounded-lg border">
                    <p className="font-semibold text-gray-800">{order.shippingAddress.fullName}</p>
                    <p className="text-gray-600">{order.shippingAddress.addressLine1}</p>
                    {order.shippingAddress.addressLine2 && <p className="text-gray-600">{order.shippingAddress.addressLine2}</p>}
                    <p className="text-gray-600">{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}</p>
                    <p className="text-gray-600">{order.shippingAddress.country}</p>
                 </div>
            </div>
        </div>
      </div>
       <div className="mt-8 text-center">
            <Link to="/my-orders" className="font-medium text-primary-600 hover:text-primary-500">
                &larr; Back to all orders
            </Link>
        </div>
    </div>
  );
};

export default TrackOrderPage;
