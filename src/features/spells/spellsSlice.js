/*
  spellsSlice.js
*/

import Notify from "simple-notify";
import "simple-notify/dist/simple-notify.min.css";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchSpellsList, fetchSpellItem } from "api/spells";

export const fetchSpells = createAsyncThunk("spells/fetchSpells", () =>
  fetchSpellsList()
);
export const fetchSpell = createAsyncThunk("spells/fetchSpell", (url) =>
  fetchSpellItem(url)
);

function pushNotify(heading, message, status) {
  new Notify({
    status: status,
    title: heading,
    text: message,
    effect: "slide",
    speed: 300,
    customClass: "notification-sig",
    customIcon: null,
    showIcon: true,
    showCloseButton: true,
    autoclose: true,
    autotimeout: 4000,
    gap: 20,
    distance: 20,
    type: 1,
    position: "right bottom",
  });
}
// get favourites from localstorage
function getInitialFavourites() {
  try {
    const favsStr = localStorage.getItem("spells.favourites");
    return favsStr ? favsStr.split(",") : [];
  } catch (err) {
    return [];
  }
}
// set favourites to local storage
function setInitialFavourites(value) {
  try {
    localStorage.setItem("spells.favourites", value.join(","));
  } catch (err) {
    // Ignore.
  }
}

export const spellsSlice = createSlice({
  name: "spells",
  initialState: {
    spells: [],
    spell: [],
    storage: [],
    favourites: getInitialFavourites(),
    status: "idle",
    error: null,
  },
  reducers: {
    addToFavourites: (state, action) => {
      state.favourites.push(action.payload.index);
      setInitialFavourites(state.favourites);
      pushNotify(
        "Added Favourite!",
        "You've added this spell to your favourites.",
        "success"
      );
    },
    removeFromFavourites: (state, action) => {
      state.favourites = state.favourites.filter(
        (index) => index !== action.payload.index
      );
      setInitialFavourites(state.favourites);
      pushNotify(
        "Removed Favourite!",
        "You've removed this spell to your favourites.",
        "error"
      );
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchSpells.pending, (state, action) => {
        state.status = "loading..";
        state.error = null;
      })
      .addCase(fetchSpells.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.spells = action.payload;
      })
      .addCase(fetchSpells.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error;
      })
      .addCase(fetchSpell.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchSpell.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.spell = action.payload;
      })
      .addCase(fetchSpell.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error;
      });
  },
});

export const { addToFavourites, removeFromFavourites } = spellsSlice.actions;

export default spellsSlice.reducer;
