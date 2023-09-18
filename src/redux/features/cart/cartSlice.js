import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("persist:root")
  ? JSON.parse(localStorage.getItem("persist:root")).cart
  : [];

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      if (state.find((item) => item._id === action.payload._id)) {
        return state.map((item) => ({
          ...item,
          qty: item._id === action.payload._id ? item.qty + 1 : item.qty,
        }));
      } else {
        return [...state, { ...action.payload, qty: 1 }];
      }
    },

    decreaseItem: (state, action) => {
      return state
        .map((item) => ({
          ...item,
          qty: item._id === action.payload._id ? item.qty - 1 : item.qty,
        }))
        .filter((item) => item.qty > 0);
    },

    increaseItem: (state, action) => {
      return state
        .map((item) => ({
          ...item,
          qty: item._id === action.payload._id ? item.qty + 1 : item.qty,
        }))
        .filter((item) => item.qty > 0);
    },

    clearItem: (state) => {
      return (state = []);
    },
  },
});

export const { addItem, decreaseItem, increaseItem, clearItem } =
  cartSlice.actions;

export default cartSlice.reducer;
