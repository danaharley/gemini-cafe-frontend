import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPage: 1,
  perPage: 2,
};

export const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },

    setNextPage: (state, action) => {
      state.currentPage = state.currentPage + 1;
    },

    setPrevPage: (state) => {
      state.currentPage = state.currentPage - 1;
    },
  },
});

export const { setCurrentPage, setNextPage, setPrevPage } =
  addressSlice.actions;

export default addressSlice.reducer;
