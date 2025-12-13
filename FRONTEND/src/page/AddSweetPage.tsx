import React from "react";
import { useForm } from "react-hook-form";
import { createSweet } from "../api/sweets";
import { useNavigate } from "react-router-dom";

const AddSweetPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      await createSweet(data);
      alert("Sweet added!");
      navigate("/dashboard");
    } catch (error) {
      alert("Failed to add sweet");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Add New Sweet</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              {...register("name", { required: true })}
              className="w-full p-2 border rounded"
            />
            {errors.name && (
              <span className="text-red-500 text-sm">Required</span>
            )}
          </div>

          {/* Category */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="category">
              Category
            </label>
            <input
              id="category"
              {...register("category", { required: true })}
              className="w-full p-2 border rounded"
            />
            {errors.category && (
              <span className="text-red-500 text-sm">Required</span>
            )}
          </div>

          {/* Price */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="price">
              Price
            </label>
            <input
              id="price"
              type="number"
              step="0.01"
              {...register("price", { required: true, valueAsNumber: true })}
              className="w-full p-2 border rounded"
            />
            {errors.price && (
              <span className="text-red-500 text-sm">Required</span>
            )}
          </div>

          {/* Quantity */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="quantity">
              Quantity
            </label>
            <input
              id="quantity"
              type="number"
              {...register("quantity", { required: true, valueAsNumber: true })}
              className="w-full p-2 border rounded"
            />
            {errors.quantity && (
              <span className="text-red-500 text-sm">Required</span>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700"
          >
            Add Sweet
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSweetPage;
