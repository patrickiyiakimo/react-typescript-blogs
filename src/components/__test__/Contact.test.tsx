// Contact.test.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // for extra matchers
import Contact from "../Contact"; // adjust the path if needed

describe("Contact Component", () => {
  test("renders the Contact heading", () => {
    render(<Contact />);
    const headingElement = screen.getByText(/Contact/i);
    expect(headingElement).toBeInTheDocument();
  });

  test("renders the contact image", () => {
    render(<Contact />);
    const imageElement = screen.getByAltText(/contact logo/i);
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute(
      "src",
      "/images/undraw_Contact_us_re_4qqt.png"
    );
  });

  test("renders the form fields and button", () => {
    render(<Contact />);

    const nameInput = screen.getAllByPlaceholderText(/Enter Your name/i);
    expect(nameInput).toHaveLength(2); // There are two inputs with this placeholder

    const messageTextarea = screen.getByPlaceholderText(/Message/i);
    expect(messageTextarea).toBeInTheDocument();

    const submitButton = screen.getByText(/Message/i);
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveClass("bg-green-800");
  });
});
