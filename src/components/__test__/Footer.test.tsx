import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "../Footer"; // Adjust the import path as needed

describe("Footer", () => {
  test("renders footer with sections and elements", () => {
    render(<Footer />);

    // Check if all sections are present
    expect(screen.getByText(/Services/i)).toBeInTheDocument();
    expect(screen.getByText(/Company/i)).toBeInTheDocument();
    expect(screen.getByText(/Legal/i)).toBeInTheDocument();

    // Check if the newsletter form elements are present
    expect(
      screen.getByLabelText(/Enter your email address/i)
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/blogs@gmail.com/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /subscribe/i })
    ).toBeInTheDocument();
  });
});
