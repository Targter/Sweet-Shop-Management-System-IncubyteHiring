import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
//
import DashboardPage from "./DashboardPage";
// import * as sweetApi from "../api/sweets"; // We will create this next
import { getSweets } from "../api/sweets";
// Mock the API module
vi.mock("../api/sweets", () => ({
  getSweets: vi.fn(),
  purchaseSweet: vi.fn(),
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

    (getSweets as any).mockResolvedValue({ data: mockSweets });

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

  //
  // 2. Add this new test
  it("calls purchase API when buy button is clicked", async () => {
    (sweetApi.purchaseSweet as any).mockResolvedValue({
      data: { message: "Success" },
    });

    render(<DashboardPage />);

    // Wait for items to load
    await waitFor(() => screen.getByText("Chocolate Bar"));

    // Find the Buy button for the first item (Chocolate Bar)
    // We assume the first "Buy 1" button corresponds to the first item
    const buyBtn = screen.getAllByRole("button", { name: /buy 1/i })[0];

    fireEvent.click(buyBtn);

    await waitFor(() => {
      expect(sweetApi.purchaseSweet).toHaveBeenCalledWith("1", 1);
    });
  });

  it("disables buy button when out of stock", async () => {
    render(<DashboardPage />);
    await waitFor(() => screen.getByText("Gummy Bears"));

    // The second button should be disabled because Gummy Bears qty is 0
    const buttons = screen.getAllByRole("button", { name: /buy 1/i });
    expect(buttons[1]).toBeDisabled();
  });
});
