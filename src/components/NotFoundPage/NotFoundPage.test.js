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

    const notFoundHeading = getByText(/404/i);
    expect(notFoundHeading).toBeInTheDocument();

    const notFoundMessage = getByText(/Sorry this page does not exist/i);
    expect(notFoundMessage).toBeInTheDocument();

    const linkToHomePage = getByText(/Return to Home Page/i);
    expect(linkToHomePage).toBeInTheDocument();
    expect(linkToHomePage.getAttribute("href")).toBe("/");
  });
});
