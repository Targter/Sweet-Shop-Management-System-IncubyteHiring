import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import DashboardPage from "./DashboardPage";
import * as sweetApi from "../api/sweets"; // We will create this next

// Mock the API module
vi.mock("../api/sweets", () => ({
  getSweets: vi.fn(),
}));

describe("DashboardPage", () => {
  it("renders a list of sweets fetched from API", async () => {
    // Setup mock return value
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

    (sweetApi.getSweets as any).mockResolvedValue({ data: mockSweets });

    render(<DashboardPage />);

    // Check for loading state (optional, depends on speed)
    // expect(screen.getByText(/loading/i)).toBeInTheDocument();

    // Wait for items to appear
    await waitFor(() => {
      expect(screen.getByText("Chocolate Bar")).toBeInTheDocument();
      expect(screen.getByText("$5")).toBeInTheDocument();
      expect(screen.getByText("Gummy Bears")).toBeInTheDocument();
      expect(screen.getByText("Out of Stock")).toBeInTheDocument();
    });
  });
});
