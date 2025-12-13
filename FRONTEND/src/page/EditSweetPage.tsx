import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { getSweetById, updateSweet } from "../api/sweets";

const EditSweetPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (id) {
      getSweetById(id).then((res) => {
        // Pre-fill form
        setValue("name", res.data.name);
        setValue("category", res.data.category);
        setValue("price", res.data.price);
        setValue("quantity", res.data.quantity);
      });
    }
  }, [id, setValue]);

  const onSubmit = async (data: any) => {
    if (!id) return;
    try {
      await updateSweet(id, data);
      alert("Sweet updated!");
      navigate("/admin");
    } catch (error) {
      alert("Failed to update");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Edit Sweet</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              {...register("name", { required: true })}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Category</label>
            <input
              {...register("category", { required: true })}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Price</label>
            <input
              type="number"
              step="0.01"
              {...register("price", { required: true, valueAsNumber: true })}
              className="w-full p-2 border rounded"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditSweetPage;
