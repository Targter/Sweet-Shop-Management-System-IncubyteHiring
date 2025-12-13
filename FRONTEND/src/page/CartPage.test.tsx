import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import CartPage from "./CartPage";
import * as sweetApi from "../api/sweets";
import * as CartContext from "../context/CartContext";

// Mock API and Context
vi.mock("../api/sweets", () => ({ purchaseSweet: vi.fn() }));

describe("CartPage", () => {
  it("renders cart items and handles checkout", async () => {
    // Mock the Cart Context State
    const mockClearCart = vi.fn();
    const mockRemove = vi.fn();

    vi.spyOn(CartContext, "useCart").mockReturnValue({
      cart: [
        {
          _id: "1",
          name: "Test Sweet",
          price: 10,
          quantity: 5,
          category: "Test",
          cartQty: 2,
        },
      ],
      totalPrice: 20,
      addToCart: vi.fn(),
      removeFromCart: mockRemove,
      clearCart: mockClearCart,
    });

    (sweetApi.purchaseSweet as any).mockResolvedValue({});

    render(
      <BrowserRouter>
        <CartPage />
      </BrowserRouter>
    );

    // Check Render
    expect(screen.getByText("Test Sweet")).toBeInTheDocument();
    expect(screen.getByText("Total: $20.00")).toBeInTheDocument();

    // Click Checkout
    const checkoutBtn = screen.getByText(/checkout now/i);
    fireEvent.click(checkoutBtn);

    // Verify API Call
    await waitFor(() => {
      expect(sweetApi.purchaseSweet).toHaveBeenCalledWith("1", 2);
      expect(mockClearCart).toHaveBeenCalled();
    });
  });
});
