import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    message: null,
    token: null,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { message, access_token } = action.payload;
      state.message = message;
      state.token = access_token;
    },

    logout: (state) => {
      state.message = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
