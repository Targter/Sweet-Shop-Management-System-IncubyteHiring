import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAdminStats, getSweets } from "../api/sweets"; // Assuming getSweets exists
import type { Sweet } from "../types";

// --- Retro Icons ---
const Icons = {
  Home: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  Box: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  ),
  Plus: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  ),
  Chart: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
      <path d="M12 18V6" />
    </svg>
  ),
  LogOut: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  ),
  Edit: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
    </svg>
  ),
};

// ==========================================
// SUB-COMPONENT: Overview Tab (The Stats)
// ==========================================
const OverviewTab = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminStats()
      .then((res) => {
        setStats(res.data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  if (loading)
    return <div className="p-8 text-center italic">Reading the books...</div>;
  if (!stats)
    return (
      <div className="p-8 text-center text-red-500">Error loading ledger.</div>
    );

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            label: "Total Revenue",
            val: `$${stats.totalRevenue.toFixed(2)}`,
            color: "border-[#2A9D8F] shadow-[#2A9D8F]",
            icon: "💰",
          },
          {
            label: "Total Orders",
            val: stats.totalOrders,
            color: "border-[#E76F51] shadow-[#E76F51]",
            icon: "📦",
          },
          {
            label: "Products",
            val: stats.totalProducts,
            color: "border-[#E9C46A] shadow-[#E9C46A]",
            icon: "🧁",
          },
          {
            label: "Customers",
            val: stats.totalCustomers,
            color: "border-[#2C241B] shadow-gray-400",
            icon: "👥",
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className={`bg-white p-5 rounded-xl border-2 border-[#2C241B] ${item.color} shadow-[4px_4px_0px_0px] relative overflow-hidden group hover:-translate-y-1 transition-transform`}
          >
            <p className="text-xs font-black uppercase tracking-widest text-gray-500 mb-1">
              {item.label}
            </p>
            <h2 className="text-3xl font-black text-[#2C241B]">{item.val}</h2>
            <span className="absolute top-2 right-2 text-2xl opacity-20">
              {item.icon}
            </span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders Ledger */}
        <div className="lg:col-span-2 bg-white rounded-xl border-2 border-[#2C241B] shadow-[6px_6px_0px_0px_#2C241B] flex flex-col">
          <div className="p-4 border-b-2 border-[#2C241B] bg-[#FEFBEA] flex justify-between items-center">
            <h3 className="font-serif font-black text-xl italic">
              Recent Transactions
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#2C241B] text-[#FEFBEA] font-serif italic">
                <tr>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-dashed divide-[#2C241B]/10">
                {stats.recentOrders.map((order: any) => (
                  <tr
                    key={order._id}
                    className="hover:bg-[#FEFBEA] transition-colors"
                  >
                    <td className="p-4 font-bold">
                      {order.user?.username || "Guest"}
                    </td>
                    <td className="p-4 font-mono font-bold text-[#E76F51]">
                      ${order.totalAmount}
                    </td>
                    <td className="p-4 text-xs font-bold text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <span className="border border-[#2A9D8F] text-[#2A9D8F] px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                        Paid
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock Alert */}
        <div className="bg-[#FFF8F0] rounded-xl border-2 border-[#2C241B] shadow-[4px_4px_0px_0px_#E76F51] flex flex-col">
          <div className="p-4 border-b-2 border-[#2C241B] bg-[#E76F51] text-white">
            <h3 className="font-bold">⚠️ Pantry Low Stock</h3>
          </div>
          <ul className="flex-grow p-0">
            {stats.lowStockItems.length === 0 ? (
              <li className="p-4 text-[#2A9D8F] font-bold">
                Everything is stocked!
              </li>
            ) : (
              stats.lowStockItems.map((item: any) => (
                <li
                  key={item._id}
                  className="p-3 border-b border-[#2C241B]/10 flex justify-between items-center hover:bg-white/50"
                >
                  <span className="font-bold text-sm text-[#2C241B]">
                    {item.name}
                  </span>
                  <span className="font-black text-[#E76F51] text-sm">
                    {item.quantity} left
                  </span>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// SUB-COMPONENT: Inventory Tab (Manage Products)
// ==========================================
const InventoryTab = () => {
  const [products, setProducts] = useState<Sweet[]>([]);

  useEffect(() => {
    getSweets()
      .then((res) => setProducts(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="bg-white rounded-xl border-2 border-[#2C241B] shadow-[6px_6px_0px_0px_#2C241B] overflow-hidden animate-fade-in">
      <div className="p-4 border-b-2 border-[#2C241B] bg-[#E9C46A] flex justify-between items-center">
        <h3 className="font-serif font-black text-xl italic text-[#2C241B]">
          Product Catalog
        </h3>
        <span className="text-xs font-bold bg-[#2C241B] text-[#E9C46A] px-2 py-1 rounded">
          {products.length} Items
        </span>
      </div>
      <table className="w-full text-left text-sm">
        <thead className="bg-[#2C241B]/5 border-b-2 border-[#2C241B]">
          <tr>
            <th className="p-4 font-bold text-[#2C241B]">Name</th>
            <th className="p-4 font-bold text-[#2C241B]">Category</th>
            <th className="p-4 font-bold text-[#2C241B]">Price</th>
            <th className="p-4 font-bold text-[#2C241B]">Stock</th>
            <th className="p-4 font-bold text-[#2C241B] text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#2C241B]/10">
          {products.map((p) => (
            <tr key={p._id} className="hover:bg-[#FEFBEA]">
              <td className="p-4 font-bold">{p.name}</td>
              <td className="p-4">
                <span className="bg-[#FEFBEA] border border-[#2C241B] px-2 py-0.5 rounded text-xs font-bold uppercase">
                  {p.category}
                </span>
              </td>
              <td className="p-4 font-mono">${p.price}</td>
              <td
                className={`p-4 font-bold ${
                  p.quantity < 5 ? "text-red-500" : "text-green-600"
                }`}
              >
                {p.quantity}
              </td>
              <td className="p-4 text-right">
                <button className="text-[#2C241B] hover:text-[#E76F51] font-bold text-xs underline">
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// ==========================================
// PARENT COMPONENT: Admin Dashboard Layout
// ==========================================
const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<"overview" | "inventory" | "add">(
    "overview"
  );
  const navigate = useNavigate();

  // Navigation Items
  const navItems = [
    { id: "overview", label: "Overview", icon: <Icons.Chart /> },
    { id: "inventory", label: "Inventory", icon: <Icons.Box /> },
    { id: "add", label: "Add Product", icon: <Icons.Plus /> },
  ];

  return (
    <div className="min-h-screen bg-[#FEFBEA] text-[#2C241B] font-sans flex flex-col md:flex-row">
      {/* --- SIDEBAR (Left Tab) --- */}
      <aside className="w-full md:w-64 bg-[#2C241B] text-[#FEFBEA] flex flex-col border-r-4 border-[#E76F51]">
        {/* Brand Logo */}
        <div
          className="p-6 border-b border-[#FEFBEA]/20 flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="bg-[#E76F51] w-10 h-10 flex items-center justify-center rounded border-2 border-[#FEFBEA]">
            <span className="text-xl">⚙️</span>
          </div>
          <div>
            <h1 className="text-xl font-serif font-black italic tracking-wide">
              Admin<span className="text-[#E76F51]">Panel</span>
            </h1>
            <p className="text-[10px] uppercase opacity-70 tracking-widest">
              Back Office
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-grow p-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition-all duration-200 border-2
                    ${
                      activeTab === item.id
                        ? "bg-[#FEFBEA] text-[#2C241B] border-[#FEFBEA] shadow-[4px_4px_0px_0px_#E76F51] translate-x-1"
                        : "bg-transparent text-[#FEFBEA] border-transparent hover:bg-[#FEFBEA]/10 hover:border-[#FEFBEA]/20"
                    }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="p-6 border-t border-[#FEFBEA]/20">
          <button
            onClick={() => navigate("/")}
            className="w-full flex items-center gap-2 text-sm font-bold opacity-70 hover:opacity-100 hover:text-[#E76F51] transition"
          >
            <Icons.Home /> Back to Shop
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA (Right Tab) --- */}
      <main className="flex-grow p-6 md:p-10 overflow-y-auto h-screen">
        {/* Dynamic Header */}
        <header className="mb-8 flex justify-between items-end border-b-2 border-[#2C241B] pb-4 border-dashed">
          <div>
            <h2 className="text-4xl font-serif font-black capitalize">
              {activeTab.replace("-", " ")}
            </h2>
            <p className="text-gray-500 font-bold mt-1">
              {activeTab === "overview" && "Today's bakery stats and ledger."}
              {activeTab === "inventory" && "Manage stocks and pricing."}
              {activeTab === "add" && "Create a new delicious treat."}
            </p>
          </div>
          <div className="text-sm font-bold bg-[#E9C46A] px-3 py-1 rounded border-2 border-[#2C241B] shadow-[2px_2px_0px_0px_#2C241B]">
            {new Date().toLocaleDateString()}
          </div>
        </header>

        {/* --- Content Switcher --- */}
        <div className="max-w-6xl mx-auto">
          {activeTab === "overview" && <OverviewTab />}
          {activeTab === "inventory" && <InventoryTab />}
          {activeTab === "add" && (
            <div className="bg-white p-8 rounded-xl border-2 border-[#2C241B] shadow-[6px_6px_0px_0px_#2C241B] max-w-2xl">
              <h3 className="text-xl font-bold mb-4">Add New Item</h3>
              <p className="text-gray-400 mb-6 italic">
                Form functionality would go here (linking to your AddProduct
                route)...
              </p>
              <button
                onClick={() => navigate("/admin/add")}
                className="bg-[#2A9D8F] text-white px-6 py-3 rounded border-2 border-[#2C241B] font-bold shadow-[4px_4px_0px_0px_#2C241B] hover:shadow-none hover:translate-y-[2px]"
              >
                Go to Full Add Form
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
