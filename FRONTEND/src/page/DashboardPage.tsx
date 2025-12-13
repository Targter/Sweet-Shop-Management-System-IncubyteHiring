
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext"; // Import Cart Hook
import { getSweets } from "../api/sweets";
import type { Sweet } from "../types";

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const { addToCart, cart } = useCart(); // Use Cart
  const navigate = useNavigate();

  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [filteredSweets, setFilteredSweets] = useState<Sweet[]>([]);
  const [category, setCategory] = useState("All");
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  // Filter logic
  useEffect(() => {
    if (category === "All") {
      setFilteredSweets(sweets);
    } else {
      setFilteredSweets(sweets.filter((s) => s.category === category));
    }
  }, [category, sweets]);

  const fetchData = async () => {
    try {
      const res = await getSweets();
      setSweets(res.data);
      console.log(res.data);
      // Extract unique categories for the filter dropdown
      const uniqueCats = [
        "All",
        ...new Set(res.data.map((s: Sweet) => s.category)),
      ];
      setCategories(uniqueCats as string[]);
    } catch (error) {
      console.error("Error fetching sweets");
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold">Sweet Shop</h1>

        <div className="flex items-center gap-4">
          {/* Cart Button */}
          <button
            onClick={() => navigate("/cart")}
            className="relative bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
          >
            🛒 View Cart
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                {cart.reduce((acc, item) => acc + item.cartQty, 0)}
              </span>
            )}
          </button>

          {user?.role === "admin" && (
            <button
              onClick={() => navigate("/admin")}
              className="bg-purple-600 text-white px-4 py-2 rounded"
            >
              Admin Panel
            </button>
          )}
          <button
            onClick={logout}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Filter Section */}
      <div className="mb-6 flex items-center gap-2">
        <span className="font-bold text-gray-700">Filter by Category:</span>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 border rounded shadow-sm bg-white"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredSweets.map((sweet) => (
          <div
            key={sweet._id}
            className="bg-white p-6 rounded shadow hover:shadow-lg transition"
          >
            <h3 className="text-xl font-bold text-gray-800">{sweet.name}</h3>
            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mt-2">
              {sweet.category}
            </span>

            <div className="mt-4 flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">${sweet.price}</span>
              {sweet.quantity > 0 ? (
                <span className="text-green-600 font-medium">
                  {sweet.quantity} left
                </span>
              ) : (
                <span className="text-red-500 font-bold">Out of Stock</span>
              )}
            </div>

            <button
              onClick={() => addToCart(sweet)}
              disabled={sweet.quantity === 0}
              className={`w-full py-2 px-4 rounded font-bold text-white transition
                ${
                  sweet.quantity > 0
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
            >
              {sweet.quantity > 0 ? "Add to Cart" : "Sold Out"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
