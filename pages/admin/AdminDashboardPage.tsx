import React, { useEffect, useState } from 'react';
import { Order, Product } from '../../types';
import { api } from '../../services/mockApiService';
import StatCard from '../../components/admin/StatCard';
import Spinner from '../../components/common/Spinner';

const AdminDashboardPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ordersData, productsData] = await Promise.all([
          api.getOrders(),
          api.getProducts(),
        ]);
        setOrders(ordersData);
        setProducts(productsData);
      } catch (error) {
        console.error("Failed to fetch admin data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalRevenue = orders.reduce((acc, order) => acc + order.total, 0);
  const totalOrders = orders.length;
  const totalProducts = products.length;

  if (loading) {
    return <div className="flex justify-center items-center h-full"><Spinner /></div>;
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-100 mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard title="Total Revenue" value={`$${totalRevenue.toFixed(2)}`} />
        <StatCard title="Total Orders" value={totalOrders.toString()} />
        <StatCard title="Total Products" value={totalProducts.toString()} />
      </div>
    </div>
  );
};

export default AdminDashboardPage;