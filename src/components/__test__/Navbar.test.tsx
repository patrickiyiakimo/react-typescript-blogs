import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Navbar from "../Navbar";
// import LoginForm from "../LoginForm";

// Mock the LoginForm component
jest.mock("./LoginForm", () => () => <div>Login Form</div>);

describe("Navbar Component", () => {
  const mockLists = {
    first: "Home",
    second: "Blogs",
    third: "Contact",
  };

  beforeEach(() => {
    render(<Navbar lists={mockLists} />);
  });

  test("renders the navbar with correct text and links", () => {
    // Check the navbar title
    expect(screen.getByText(/Blogs/i)).toBeInTheDocument();

    // Check the mobile menu items
    expect(screen.getByText(mockLists.first)).toBeInTheDocument();
    expect(screen.getByText(mockLists.second)).toBeInTheDocument();
    expect(screen.getByText(mockLists.third)).toBeInTheDocument();

    // Check the desktop menu items
    const desktopMenuItems = screen.getAllByRole("listitem");
    expect(desktopMenuItems[0]).toHaveTextContent(mockLists.first);
    expect(desktopMenuItems[1]).toHaveTextContent(mockLists.second);
    expect(desktopMenuItems[2]).toHaveTextContent(mockLists.third);
  });

  test("opens the login modal when the 'Log In' button is clicked", () => {
    // Simulate button click
    const loginButton = screen.getByText(/Log In/i);
    fireEvent.click(loginButton);

    // Check if the modal is opened
    const modal = screen.getByRole("dialog");
    expect(modal).toBeInTheDocument();
    expect(screen.getByText("Login Form")).toBeInTheDocument();
  });

  test("closes the login modal when the close button is clicked", () => {
    // Open the modal first
    const loginButton = screen.getByText(/Log In/i);
    fireEvent.click(loginButton);

    // Close the modal
    const closeButton = screen.getByRole("button", { name: /✕/i });
    fireEvent.click(closeButton);

    // The modal should no longer be in the document
    const modal = screen.queryByRole("dialog");
    expect(modal).not.toBeInTheDocument();
  });
});
