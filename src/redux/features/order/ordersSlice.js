import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPage: 1,
  perPage: 5,
};

export const ordersSlice = createSlice({
  name: "orders",
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

export const { setCurrentPage, setNextPage, setPrevPage } = ordersSlice.actions;

export default ordersSlice.reducer;
