import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import AddSweetPage from "./AddSweetPage";
import * as sweetApi from "../api/sweets";

// Mock API
vi.mock("../api/sweets", () => ({
  createSweet: vi.fn(),
}));

describe("AddSweetPage", () => {
  it("submits form with correct values", async () => {
    (sweetApi.createSweet as any).mockResolvedValue({ data: {} });

    render(
      <BrowserRouter>
        <AddSweetPage />
      </BrowserRouter>
    );

    // 1. Fill inputs using the updated UI Labels

    // Label: "Sweet Name *"
    fireEvent.change(screen.getByLabelText(/sweet name/i), {
      target: { value: "New Candy" },
    });

    // Label: "Category *"
    fireEvent.change(screen.getByLabelText(/category/i), {
      target: { value: "Hard" },
    });

    // Label: "Price ($) *"
    fireEvent.change(screen.getByLabelText(/price/i), {
      target: { value: "5" },
    });

    // Label: "Initial Stock *" (Changed from 'quantity')
    fireEvent.change(screen.getByLabelText(/initial stock/i), {
      target: { value: "50" },
    });

    // 2. Click submit button using the updated text "Save to Pantry"
    const saveBtn = screen.getByRole("button", { name: /save to pantry/i });
    fireEvent.click(saveBtn);

    // 3. Verify API payload
    await waitFor(() => {
      expect(sweetApi.createSweet).toHaveBeenCalledWith({
        name: "New Candy",
        category: "Hard",
        price: 5,
        quantity: 50,
      });
    });
  });
});
