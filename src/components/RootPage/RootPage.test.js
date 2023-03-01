import React from "react";
import { Provider } from "react-redux";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import configureMockStore from "redux-mock-store";
import RootPage from "./RootPage";

const mockStore = configureMockStore([]);

describe("RootPage component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      spells: {
        spells: [
          {
            index: "1",
            name: "Spell 1",
            url: "/api/spells/1",
          },
          {
            index: "2",
            name: "Spell 2",
            url: "/api/spells/2",
          },
        ],
        favourites: [],
        spell: null,
        storage: {},
        status: "idle",
        error: null,
      },
    });
  });

  it("should render the spell list page by default", async () => {
    render(
      <Provider store={store}>
        <RootPage />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText("Spell List")).toBeInTheDocument();
    });

    expect(screen.getByText("Total Count:")).toBeInTheDocument();
    expect(screen.getAllByRole("button")).toHaveLength(2);
  });

  it("should render the favourite spells page when favourites prop is passed", async () => {
    render(
      <Provider store={store}>
        <RootPage favourites />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText("My Favourite Spells")).toBeInTheDocument();
    });

    expect(screen.getByText("Total Count:")).toBeInTheDocument();
    expect(screen.getAllByRole("button")).toHaveLength(2);
  });

  it("should display a loading spinner when fetching spells", async () => {
    store = mockStore({
      spells: {
        spells: [],
        favourites: [],
        spell: null,
        storage: {},
        status: "loading..",
        error: null,
      },
    });

    render(
      <Provider store={store}>
        <RootPage />
      </Provider>
    );

    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  it("should display an error message when there is an error fetching spells", async () => {
    store = mockStore({
      spells: {
        spells: [],
        favourites: [],
        spell: null,
        storage: {},
        status: "failed",
        error: { message: "Failed to fetch spells" },
      },
    });

    render(
      <Provider store={store}>
        <RootPage />
      </Provider>
    );

    expect(screen.getByText("Failed to fetch spells")).toBeInTheDocument();
    expect(screen.getByText("Click to Retry")).toBeInTheDocument();
  });

  it("should open the spell modal when a spell is clicked and close it when the close button is clicked", async () => {
    render(
      <Provider store={store}>
        <RootPage />
      </Provider>
    );

    const button = screen.getAllByRole("button")[0];

    userEvent.click(button);

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Spell Details")).toBeInTheDocument();
      expect(screen.getByText("Spell 1")).toBeInTheDocument();
    });

    const closeButton = screen.getByAltText("x");

    userEvent.click(closeButton);

    expect(screen.queryByText("Spell Details")).not.toBeInTheDocument();
  });

  it("should add a spell to favourites when the star button is clicked and remove it when clicked again", async () => {
    render(
      <Provider store={store}>
        <RootPage />
      </Provider>
    ));
