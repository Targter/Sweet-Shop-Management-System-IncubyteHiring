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

    // Fill inputs
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "New Candy" },
    });
    fireEvent.change(screen.getByLabelText(/category/i), {
      target: { value: "Hard" },
    });
    fireEvent.change(screen.getByLabelText(/price/i), {
      target: { value: "5" },
    });
    fireEvent.change(screen.getByLabelText(/quantity/i), {
      target: { value: "50" },
    });

    // Click submit
    fireEvent.click(screen.getByRole("button", { name: /add/i }));

    await waitFor(() => {
      expect(sweetApi.createSweet).toHaveBeenCalledWith({
        name: "New Candy",
        category: "Hard",
        price: 5, // Should be number
        quantity: 50, // Should be number
      });
    });
  });
});
