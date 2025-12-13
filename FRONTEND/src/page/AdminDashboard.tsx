import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSweets, deleteSweet, restockSweet } from "../api/sweets";
import type { Sweet } from "../types";

const AdminDashboard = () => {
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [restockQty, setRestockQty] = useState<{ [key: string]: number }>({});

  const fetchSweets = async () => {
    const res = await getSweets();
    setSweets(res.data);
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this sweet?")) {
      await deleteSweet(id);
      fetchSweets();
    }
  };

  const handleRestock = async (id: string) => {
    const qty = restockQty[id];
    if (!qty || qty <= 0) return alert("Enter valid quantity");

    await restockSweet(id, qty);
    setRestockQty({ ...restockQty, [id]: 0 }); // Reset input
    fetchSweets();
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <Link
          to="/add-sweet"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Add New Sweet
        </Link>
      </div>

      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Restock</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sweets.map((sweet) => (
              <tr key={sweet._id} className="border-b hover:bg-gray-50">
                <td className="p-4 font-medium">{sweet.name}</td>
                <td className="p-4 text-gray-600">{sweet.category}</td>
                <td className="p-4">${sweet.price}</td>
                <td className="p-4 font-bold text-blue-600">
                  {sweet.quantity}
                </td>

                {/* Restock Input Section */}
                <td className="p-4 flex items-center gap-2">
                  <input
                    type="number"
                    className="border rounded w-16 p-1"
                    placeholder="Qty"
                    value={restockQty[sweet._id] || ""}
                    onChange={(e) =>
                      setRestockQty({
                        ...restockQty,
                        [sweet._id]: parseInt(e.target.value),
                      })
                    }
                  />
                  <button
                    onClick={() => handleRestock(sweet._id)}
                    className="bg-blue-500 text-white px-2 py-1 rounded text-sm hover:bg-blue-600"
                  >
                    Add
                  </button>
                </td>

                {/* Actions */}
                <td className="p-4 space-x-2">
                  <Link
                    to={`/edit-sweet/${sweet._id}`}
                    className="text-indigo-600 hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(sweet._id)}
                    className="text-red-500 hover:underline ml-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
