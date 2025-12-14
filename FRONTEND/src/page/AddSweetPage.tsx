// import React from "react";
import { useForm } from "react-hook-form";
import { createSweet } from "../api/sweets";
import { useNavigate, Link } from "react-router-dom";
export interface AddSweetFormData {
  name: string;
  category: string;
  price: number;
  quantity: number;
}
const AddSweetPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddSweetFormData>();
  const navigate = useNavigate();

  const onSubmit = async (data: AddSweetFormData) => {
    try {
      await createSweet(data);
      navigate("/admin/inventory"); // Redirect to inventory list
    } catch (error) {
      alert("Failed to add sweet");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8">
        <div className="mb-8 border-b pb-4">
          <h2 className="text-2xl font-bold text-gray-900">Add New Product</h2>
          <p className="text-gray-500 text-sm">
            Fill in the details to add a new item to your inventory.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div className="col-span-2">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="name"
              >
                Product Name
              </label>
              <input
                id="name"
                {...register("name", { required: true })}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g. Dark Chocolate Truffle"
              />
              {errors.name && (
                <span className="text-red-500 text-xs">Name is required</span>
              )}
            </div>

            {/* Category */}
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="category"
              >
                Category
              </label>
              <input
                id="category"
                {...register("category", { required: true })}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g. Chocolate"
              />
            </div>

            {/* Price */}
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="price"
              >
                Price ($)
              </label>
              <input
                id="price"
                type="number"
                step="0.01"
                {...register("price", { required: true, valueAsNumber: true })}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Quantity */}
            <div className="col-span-2">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="quantity"
              >
                Initial Stock Quantity
              </label>
              <input
                id="quantity"
                type="number"
                {...register("quantity", {
                  required: true,
                  valueAsNumber: true,
                })}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
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
              Create Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSweetPage;
