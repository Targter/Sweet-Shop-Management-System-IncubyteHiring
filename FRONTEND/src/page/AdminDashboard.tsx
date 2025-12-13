import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAdminStats } from "../api/sweets";

interface StatData {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  totalCustomers: number;
  avgOrderValue: number;
  todayOrders: number;
  lowStockItems: any[];
  recentOrders: any[];
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<StatData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await getAdminStats();
        setStats(res.data);
      } catch (error) {
        console.error("Error fetching stats");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div className="p-8">Loading Analytics...</div>;
  if (!stats) return <div className="p-8">Error loading data.</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Admin Overview</h1>
        <div className="space-x-4">
          <Link to="/dashboard" className="text-blue-600 hover:underline">
            Back to Shop
          </Link>
          <Link
            to="/admin/add"
            className="bg-indigo-600 text-white px-4 py-2 rounded shadow hover:bg-indigo-700"
          >
            + Add New Product
          </Link>
        </div>
      </div>

      {/* 1. Top Cards - Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {/* Revenue */}
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-500">
          <p className="text-gray-500 text-sm font-semibold uppercase">
            Total Revenue
          </p>
          <h2 className="text-3xl font-bold text-gray-800">
            ${stats.totalRevenue.toFixed(2)}
          </h2>
          <p className="text-green-500 text-sm mt-2">
            Avg Order: ${stats.avgOrderValue}
          </p>
        </div>

        {/* Orders */}
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
          <p className="text-gray-500 text-sm font-semibold uppercase">
            Total Orders
          </p>
          <h2 className="text-3xl font-bold text-gray-800">
            {stats.totalOrders}
          </h2>
          <p className="text-blue-500 text-sm mt-2">
            Today: {stats.todayOrders}
          </p>
        </div>

        {/* Products */}
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-purple-500">
          <p className="text-gray-500 text-sm font-semibold uppercase">
            Total Products
          </p>
          <h2 className="text-3xl font-bold text-gray-800">
            {stats.totalProducts}
          </h2>
          <p className="text-gray-400 text-sm mt-2">In Inventory</p>
        </div>

        {/* Customers */}
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-yellow-500">
          <p className="text-gray-500 text-sm font-semibold uppercase">
            Total Customers
          </p>
          <h2 className="text-3xl font-bold text-gray-800">
            {stats.totalCustomers}
          </h2>
          <p className="text-yellow-600 text-sm mt-2">Active Users</p>
        </div>
      </div>

      {/* 2. Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Recent Orders */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
            <h3 className="font-bold text-gray-700">Recent Orders</h3>
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
              Last 5
            </span>
          </div>
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">User</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Date</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentOrders.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-gray-500">
                    No orders yet.
                  </td>
                </tr>
              ) : (
                stats.recentOrders.map((order: any) => (
                  <tr key={order._id} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-medium">
                      {order.user?.username || "Unknown"}
                    </td>
                    <td className="p-3">${order.totalAmount}</td>
                    <td className="p-3 text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-3">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                        Completed
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Right Column: Low Stock & Inventory Actions */}
        <div className="space-y-8">
          {/* Low Stock Alert */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 border-b bg-red-50 flex justify-between items-center">
              <h3 className="font-bold text-red-700">⚠️ Low Stock Alert</h3>
              <span className="text-xs bg-red-200 text-red-800 px-2 py-1 rounded">
                Qty &le; 5
              </span>
            </div>
            <ul>
              {stats.lowStockItems.length === 0 ? (
                <li className="p-4 text-green-600">
                  All inventory levels are good!
                </li>
              ) : (
                stats.lowStockItems.map((item: any) => (
                  <li
                    key={item._id}
                    className="p-3 border-b flex justify-between items-center hover:bg-red-50"
                  >
                    <div>
                      <span className="font-bold text-gray-800 block">
                        {item.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        {item.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-bold text-red-600">
                        {item.quantity} left
                      </span>
                      <Link
                        to={`/admin/edit/${item._id}`}
                        className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded hover:bg-indigo-200"
                      >
                        Restock
                      </Link>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-bold text-gray-700 mb-4">Quick Links</h3>
            <div className="grid grid-cols-2 gap-4">
              <Link
                to="/admin/add"
                className="border p-4 rounded text-center hover:bg-gray-50 text-indigo-600 font-semibold"
              >
                Add Product
              </Link>
              <Link
                to="/admin/inventory"
                className="border p-4 rounded text-center hover:bg-gray-50 text-green-600 font-semibold"
              >
                Manage Inventory
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
