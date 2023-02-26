import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";

describe("NotFoundPage", () => {
  test("renders correctly", () => {
    const { getByText } = render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );

    const notFoundHeading = getByText(/404 - Not Found/i);
    expect(notFoundHeading).toBeInTheDocument();

    const linkToHomePage = getByText(/Return to Home Page/i);
    expect(linkToHomePage).toBeInTheDocument();
    expect(linkToHomePage.getAttribute("href")).toBe("/");
  });
});
