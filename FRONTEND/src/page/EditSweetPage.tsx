import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getSweetById, updateSweet } from "../api/sweets";

const EditSweetPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getSweetById(id)
        .then((res) => {
          setValue("name", res.data.name);
          setValue("category", res.data.category);
          setValue("price", res.data.price);
          setValue("quantity", res.data.quantity);
          setLoading(false);
        })
        .catch(() => {
          alert("Product not found");
          navigate("/admin/inventory");
        });
    }
  }, [id, setValue, navigate]);

  const onSubmit = async (data: any) => {
    if (!id) return;
    try {
      await updateSweet(id, data);
      navigate("/admin/inventory"); // Redirect back to list
    } catch (error) {
      alert("Failed to update product");
    }
  };

  if (loading)
    return <div className="text-center p-10">Loading product details...</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8">
        <div className="mb-8 border-b pb-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Edit Product</h2>
          <span className="text-xs text-gray-400">ID: {id}</span>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Product Name
              </label>
              <input
                {...register("name")}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <input
                {...register("category")}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Price ($)
              </label>
              <input
                type="number"
                step="0.01"
                {...register("price", { valueAsNumber: true })}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Stock Quantity{" "}
                <span className="text-xs text-gray-500">
                  (To restock, increase this number)
                </span>
              </label>
              <input
                type="number"
                {...register("quantity", { valueAsNumber: true })}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Link
              to="/admin/inventory"
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 shadow-sm"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSweetPage;
