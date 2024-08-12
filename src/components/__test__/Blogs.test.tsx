import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Blogs from "../Blogs";

// Mock the localStorage
const localStorageMock = (() => {
  let store: { [key: string]: string } = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => (store[key] = value),
    clear: () => (store = {}),
    removeItem: (key: string) => delete store[key],
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

// Mock the fetch function globally
global.fetch = jest.fn();

// Clear mocks after each test
afterEach(() => {
  jest.clearAllMocks();
});

describe("Blogs Component", () => {
  test("displays loading state", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    render(<Blogs />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    await waitFor(() => expect(fetch).toHaveBeenCalled());
  });

  test("displays error message when fetch fails", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: "An error occurred" }),
    });

    render(<Blogs />);

    await waitFor(() => {
      expect(screen.getByText("Error: An error occurred")).toBeInTheDocument();
    });
  });

  test("displays blogs when data is fetched successfully", async () => {
    const mockBlogs = [
      { id: 1, title: "First Blog", content: "This is the first blog." },
      { id: 2, title: "Second Blog", content: "This is the second blog." },
    ];

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockBlogs,
    });

    render(<Blogs />);

    await waitFor(() => {
      expect(screen.getByText("First Blog")).toBeInTheDocument();
      expect(screen.getByText("This is the first blog.")).toBeInTheDocument();
      expect(screen.getByText("Second Blog")).toBeInTheDocument();
      expect(screen.getByText("This is the second blog.")).toBeInTheDocument();
    });
  });

  test("displays 'No blogs found.' when no data is returned", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    render(<Blogs />);

    await waitFor(() => {
      expect(screen.getByText("No blogs found.")).toBeInTheDocument();
    });
  });
});
