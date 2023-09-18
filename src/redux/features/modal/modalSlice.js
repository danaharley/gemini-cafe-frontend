import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    loginModalIsOpen: false,
    registerModalIsOpen: false,
    addressModalIsOpen: false,
  },
  reducers: {
    setLoginModalIsOpen: (state, action) => {
      state.loginModalIsOpen = action.payload;
    },

    setRegisterModalIsOpen: (state, action) => {
      state.registerModalIsOpen = action.payload;
    },

    setAddressModalIsOpen: (state, action) => {
      state.addressModalIsOpen = action.payload;
    },
  },
});

export const {
  setLoginModalIsOpen,
  setRegisterModalIsOpen,
  setAddressModalIsOpen,
} = modalSlice.actions;

export default modalSlice.reducer;
