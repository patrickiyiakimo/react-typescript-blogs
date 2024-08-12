import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoginForm from "../LoginForm";

// Mocking the fetch API
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ token: "mock-token" }),
  })
) as jest.Mock;

describe("LoginForm Component", () => {
  const setup = () => {
    render(<LoginForm text="Log In" />);
  };

  test("renders the form with initial values and validation errors", async () => {
    setup();

    // Check for the form legend
    expect(screen.getByText(/Log In/i)).toBeInTheDocument();

    // Check the email field
    const emailInput = screen.getByPlaceholderText(/Email/i);
    expect(emailInput).toBeInTheDocument();

    // Check the password field
    const passwordInput = screen.getByPlaceholderText(/Password/i);
    expect(passwordInput).toBeInTheDocument();

    // Check the submit button
    const submitButton = screen.getByText(/Log In/i);
    expect(submitButton).toBeInTheDocument();

    // Check validation errors on submit without input
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
    });
  });

  test("submits the form with valid data", async () => {
    setup();

    // Fill out the form
    fireEvent.change(screen.getByPlaceholderText(/Email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: "password123" },
    });

    // Mock fetch response
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ token: "mock-token" }),
    });

    // Submit the form
    fireEvent.click(screen.getByText(/Log In/i));

    await waitFor(() => {
      // Check if localStorage.setItem was called with the token
      expect(localStorage.getItem("blog-api-token")).toBe("mock-token");
    });
  });

  test("handles submission error", async () => {
    setup();

    // Fill out the form
    fireEvent.change(screen.getByPlaceholderText(/Email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: "password123" },
    });

    // Mock fetch response to simulate an error
    (global.fetch as jest.Mock).mockRejectedValueOnce(
      new Error("Network error")
    );

    // Submit the form
    fireEvent.click(screen.getByText(/Log In/i));

    await waitFor(() => {
      // Check if token is not set in localStorage due to error
      expect(localStorage.getItem("blog-api-token")).toBe(null);
    });
  });
});
