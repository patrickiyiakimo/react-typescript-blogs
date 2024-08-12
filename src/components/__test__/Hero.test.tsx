import React from "react";
import { render, screen } from "@testing-library/react";
import Hero from "../Hero";

test("renders Hero component with props and content", () => {
  // Define the props to be passed to the Hero component
  const props = {
    name: "Amazing Blog",
  };

  // Render the Hero component with the given props
  render(<Hero {...props} />);

  // Check if the component renders the welcome message with the provided name
  expect(screen.getByText(/Welcome to our Amazing Blog/i)).toBeInTheDocument();

  // Check if the descriptive text is rendered
  expect(
    screen.getByText(
      /We are excited to have you here. Whether you're seeking inspiration,/i
    )
  ).toBeInTheDocument();
  expect(
    screen.getByText(
      /knowledge, or just a good read, you've come to the right place. Explore/i
    )
  ).toBeInTheDocument();
  expect(
    screen.getByText(
      /our latest posts, and feel free to join the conversation!/i
    )
  ).toBeInTheDocument();
});
