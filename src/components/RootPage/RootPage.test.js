import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
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
            index: "acid-arrow",
            name: "Acid Arrow",
            url: "/api/spells/acid-arrow",
          },
          {
            index: "bless",
            name: "Bless",
            url: "/api/spells/bless",
          },
        ],
        spell: null,
        storage: null,
        favourites: [],
        status: "idle",
        error: null,
      },
    });
  });

  it("should render Spell List header", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <RootPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByRole("heading", { name: "Spell List" })).toBeInTheDocument();
  });

  it("should render My Favourite Spells header when favourites prop is passed", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <RootPage favourites />
        </MemoryRouter>
      </Provider>
    );

    expect(
      screen.getByRole("heading", { name: "My Favourite Spells" })
    ).toBeInTheDocument();
  });

  it("should render loader when status is loading", () => {
    store = mockStore({
      spells: {
        spells: [],
        spell: null,
        storage: null,
        favourites: [],
        status: "loading",
        error: null,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <RootPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("should render No Spells Found message when status is succeeded but spells list is empty", () => {
    store = mockStore({
      spells: {
        spells: [],
        spell: null,
        storage: null,
        favourites: [],
        status: "succeeded",
        error: null,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <RootPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/No Spells Found/)).toBeInTheDocument();
  });

  it("should render error message and retry button when error is present", () => {
    store = mockStore({
      spells: {
        spells: [],
        spell: null,
        storage: null,
        favourites: [],
        status: "failed",
        error: {
          message: "Failed to fetch spells",
        },
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <RootPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Failed to fetch spells/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Click to Retry" })).toBeInTheDocument();
  });

  it("should render spells list when status is succeeded and spells list is not empty", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <RootPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Total Count:/)).toBeInTheDocument();
