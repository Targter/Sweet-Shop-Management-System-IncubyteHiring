import { useEffect, useState } from "react";
import { getSweets, purchaseSweet } from "../api/sweets";
import type { Sweet } from "../types";

const DashboardPage = () => {
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getSweets();
      setSweets(response.data);
    } catch (error) {
      console.error("Failed to fetch sweets", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBuy = async (id: string) => {
    try {
      await purchaseSweet(id, 1);
      // Refresh data to show new stock level
      fetchData();
    } catch (error) {
      alert("Purchase failed!");
    }
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Sweet Shop Inventory</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sweets.map((sweet) => (
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
                  {sweet.quantity} in stock
                </span>
              ) : (
                <span className="text-red-500 font-bold">Out of Stock</span>
              )}
            </div>

            {/* New Button Section */}
            <button
              onClick={() => handleBuy(sweet._id)}
              disabled={sweet.quantity === 0}
              className={`w-full py-2 px-4 rounded font-bold text-white transition
                ${
                  sweet.quantity > 0
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
            >
              {sweet.quantity > 0 ? "Buy 1" : "Sold Out"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
