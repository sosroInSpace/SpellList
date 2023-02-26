/*
  store.js
*/

import { configureStore } from "@reduxjs/toolkit";
import spellsReducer from "features/spells/spellsSlice";

export const store = configureStore({
  reducer: {
    spells: spellsReducer,
  },
});
