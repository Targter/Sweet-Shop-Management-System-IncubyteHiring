import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import * as sweetApi from "../api/sweets";

// Mock API
vi.mock("../api/sweets", () => ({
  getSweets: vi.fn(),
  deleteSweet: vi.fn(),
  restockSweet: vi.fn(),
  getAdminStats: vi.fn(),
}));

describe("AdminDashboard", () => {
  const mockSweets = [
    { _id: "1", name: "Test Candy", category: "Test", price: 10, quantity: 5 },
  ];

  beforeEach(() => {
    (sweetApi.getSweets as any).mockResolvedValue({ data: mockSweets });
  });

  it("renders sweet list and handles delete", async () => {
    (sweetApi.deleteSweet as any).mockResolvedValue({});

    render(
      <BrowserRouter>
        <AdminDashboard />
      </BrowserRouter>
    );

    await waitFor(() => screen.getByText("Test Candy"));

    // Click Delete
    const deleteBtn = screen.getByText(/delete/i);
    fireEvent.click(deleteBtn);

    it("renders analytics stats correctly", async () => {
      // Mock Response
      (sweetApi.getAdminStats as any).mockResolvedValue({
        data: {
          totalRevenue: 5000,
          totalOrders: 20,
          totalProducts: 10,
          totalCustomers: 5,
          avgOrderValue: 250,
          todayOrders: 2,
          lowStockItems: [],
          recentOrders: [],
        },
      });

      render(
        <BrowserRouter>
          <AdminDashboard />
        </BrowserRouter>
      );

      // Check for Loading
      expect(screen.getByText(/loading/i)).toBeInTheDocument();

      // Check for Data
      await waitFor(() => {
        expect(screen.getByText("$5000.00")).toBeInTheDocument(); // Revenue
        expect(screen.getByText("20")).toBeInTheDocument(); // Orders
        expect(screen.getByText("10")).toBeInTheDocument(); // Products
      });
    });
    // Confirm browser dialog (window.confirm)
    // Vitest needs a spy on window.confirm if used, or we can assume custom UI.
    // For simplicity, we assume the component calls API directly in this test or mocks confirm.
  });
});
