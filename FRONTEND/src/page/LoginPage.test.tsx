import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import LoginPage from "./LoginPagee";
import * as AuthContext from "../context/AuthContext"; // Import context to mock it

// Mock the AuthContext
const mockLogin = vi.fn();

// We intercept the useAuth hook to return our mock function
vi.spyOn(AuthContext, "useAuth").mockReturnValue({
  user: null,
  login: mockLogin,
  logout: vi.fn(),
  isAuthenticated: false,
} as any);

describe("LoginPage", () => {
  beforeEach(() => {
    mockLogin.mockClear();
  });

  it("renders login form", () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("calls login function on submit", async () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    // Fill inputs
    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });

    // Click submit
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    // Wait for the mock to be called
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        username: "testuser",
        password: "password123",
      });
    });
  });
});
