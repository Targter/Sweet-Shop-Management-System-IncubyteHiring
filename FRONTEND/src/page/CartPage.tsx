import React, { useState } from "react";
// import { useCart } from "../context/CartContext";
import { useCart } from "../context/CartContext";
import { purchaseSweet } from "../api/sweets";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { cart, removeFromCart, clearCart, totalPrice } = useCart();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    setLoading(true);

    try {
      // Process all items in parallel
      const promises = cart.map((item) =>
        purchaseSweet(item._id, item.cartQty)
      );
      await Promise.all(promises);

      alert("Purchase successful!");
      clearCart();
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Some items could not be purchased. Check stock.");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
        <button
          onClick={() => navigate("/dashboard")}
          className="text-blue-500 underline"
        >
          Go back to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      <div className="bg-white rounded shadow p-6 max-w-4xl mx-auto">
        {cart.map((item) => (
          <div
            key={item._id}
            className="flex justify-between items-center border-b py-4"
          >
            <div>
              <h3 className="font-bold text-lg">{item.name}</h3>
              <p className="text-gray-500">
                Qty: {item.cartQty} x ${item.price}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-bold">
                ${(item.price * item.cartQty).toFixed(2)}
              </span>
              <button
                onClick={() => removeFromCart(item._id)}
                className="text-red-500 hover:text-red-700 font-bold"
              >
                Remove
              </button>
            </div>
          </div>
        ))}

        <div className="mt-6 flex justify-between items-center pt-4 border-t">
          <h2 className="text-2xl font-bold">
            Total: ${totalPrice.toFixed(2)}
          </h2>
          <div className="space-x-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Keep Shopping
            </button>
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="px-6 py-2 bg-green-600 text-white font-bold rounded hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? "Processing..." : "Checkout Now"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
