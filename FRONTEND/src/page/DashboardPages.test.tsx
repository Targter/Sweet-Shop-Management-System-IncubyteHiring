import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import DashboardPage from "./DashboardPage";
import { getSweets } from "../api/sweets";

// ---- MOCK API ----
vi.mock("../api/sweets", () => ({
  getSweets: vi.fn(),
}));

// ---- MOCK AUTH CONTEXT ----
vi.mock("../context/AuthContext", () => ({
  useAuth: () => ({
    user: { role: "user" },
    logout: vi.fn(),
  }),
}));

// ---- MOCK CART CONTEXT ----
const addToCartMock = vi.fn();

vi.mock("../context/CartContext", () => ({
  useCart: () => ({
    cart: [],
    addToCart: addToCartMock,
  }),
}));

describe("DashboardPage", () => {
  const mockSweets = [
    {
      _id: "1",
      name: "Chocolate Bar",
      price: 5,
      quantity: 10,
      category: "Choco",
    },
    {
      _id: "2",
      name: "Gummy Bears",
      price: 3,
      quantity: 0,
      category: "Gummy",
    },
  ];

  it("renders a list of sweets fetched from API", async () => {
    (getSweets as any).mockResolvedValue({ data: mockSweets });

    render(
      <BrowserRouter>
        <DashboardPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Chocolate Bar")).toBeInTheDocument();
      expect(screen.getByText("$5")).toBeInTheDocument();
      expect(screen.getByText("Gummy Bears")).toBeInTheDocument();
      expect(screen.getByText("Out of Stock")).toBeInTheDocument();
    });
  });

  it("adds item to cart when Add to Cart button is clicked", async () => {
    (getSweets as any).mockResolvedValue({ data: mockSweets });

    render(
      <BrowserRouter>
        <DashboardPage />
      </BrowserRouter>
    );

    await waitFor(() => screen.getByText("Chocolate Bar"));

    const addBtn = screen.getByRole("button", { name: /add to cart/i });
    fireEvent.click(addBtn);

    expect(addToCartMock).toHaveBeenCalledWith(mockSweets[0]);
  });

  it("disables button when item is out of stock", async () => {
    (getSweets as any).mockResolvedValue({ data: mockSweets });

    render(
      <BrowserRouter>
        <DashboardPage />
      </BrowserRouter>
    );

    await waitFor(() => screen.getByText("Gummy Bears"));

    const soldOutBtn = screen.getByRole("button", { name: /sold out/i });
    expect(soldOutBtn).toBeDisabled();
  });
});
