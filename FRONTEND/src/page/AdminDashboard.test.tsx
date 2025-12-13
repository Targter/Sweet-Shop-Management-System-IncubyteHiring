import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import * as sweetApi from "../api/sweets";

vi.mock("../api/sweets", () => ({
  getAdminStats: vi.fn(),
}));

describe("AdminDashboard", () => {
  it("renders analytics stats correctly", async () => {
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

    // Loading state
    expect(screen.getByText(/loading analytics/i)).toBeInTheDocument();

    // Data state
    await waitFor(() => {
      expect(screen.getByText("$5000.00")).toBeInTheDocument();
      expect(screen.getByText("20")).toBeInTheDocument();
      expect(screen.getByText("10")).toBeInTheDocument();
      expect(screen.getByText("5")).toBeInTheDocument();
    });
  });
});
