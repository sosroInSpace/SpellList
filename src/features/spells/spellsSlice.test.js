/*
  spellsSlice.test.js
*/
require('intersection-observer');

import { configureStore } from "@reduxjs/toolkit";
import spellsReducer, {
  addToFavourites,
  fetchSpells,
  fetchSpell,
  removeFromFavourites,
} from "./spellsSlice";

describe("spellsSlice", () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        spells: spellsReducer,
      },
    });
  });

  it("should add a spell index to favourites and update the store", () => {
    const index = 1;
    store.dispatch(addToFavourites({ index }));
    expect(store.getState().spells.favourites).toContain(index);
  });

  it("should remove a spell index from favourites and update the store", () => {
    const index = 1;
    store.dispatch(addToFavourites({ index }));
    store.dispatch(removeFromFavourites({ index }));
    expect(store.getState().spells.favourites).not.toContain(index);
  });

  it("should fetch a list of spells", async () => {
    await store.dispatch(fetchSpells());
    expect(store.getState().spells.spells).toHaveLength(319);
  });

  it("should fetch a spell by URL", async () => {
    const url = "https://www.dnd5eapi.co/api/spells/acid-arrow";
    await store.dispatch(fetchSpell(url));
    expect(store.getState().spells.spell).toMatchObject({
      name: "Acid Arrow",
      level: 2,
    });
  });
});