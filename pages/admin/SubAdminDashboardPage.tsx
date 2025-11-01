import React, { useEffect, useState } from 'react';
import { Order, Product } from '../../types';
import { api } from '../../services/mockApiService';
import { useAuth } from '../../hooks/useAuth';
import StatCard from '../../components/admin/StatCard';
import Spinner from '../../components/common/Spinner';

const SubAdminDashboardPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      try {
        const [ordersData, productsData] = await Promise.all([
          api.getOrders(user.id),
          api.getProducts(user.id),
        ]);
        setOrders(ordersData);
        setProducts(productsData);
      } catch (error) {
        console.error("Failed to fetch sub-admin data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  const totalRevenue = orders.reduce((acc, order) => {
    const itemsTotal = order.items
      .filter(item => products.some(p => p.id === item.productId))
      .reduce((itemAcc, item) => itemAcc + item.price * item.quantity, 0);
    return acc + itemsTotal;
  }, 0);
  
  const totalOrders = orders.length;
  const totalProducts = products.length;

  if (loading) {
    return <div className="flex justify-center items-center h-full"><Spinner /></div>;
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-100 mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard title="Your Product Revenue" value={`$${totalRevenue.toFixed(2)}`} />
        <StatCard title="Your Product Orders" value={totalOrders.toString()} />
        <StatCard title="Your Products" value={totalProducts.toString()} />
      </div>
    </div>
  );
};

export default SubAdminDashboardPage;