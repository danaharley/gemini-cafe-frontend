import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { config } from "../config";
import { logout, setCredentials } from "./features/auth/authSlice";
import { clearUser } from "./features/user/userSlice";
import { setLoginModalIsOpen } from "./features/modal/modalSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: config.server.url,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().persistedReducer.auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (
    result?.error?.data?.message === "You are not logged in" ||
    result?.error?.data?.message === "Invalid token or user doesn't exist"
  ) {
    const refreshTokenResult = await baseQuery(
      "/auth/refresh",
      api,
      extraOptions
    );

    if (refreshTokenResult?.data?.access_token) {
      const data = api.getState().persistedReducer.auth;

      api.dispatch(
        setCredentials({
          ...data,
          access_token: refreshTokenResult?.data?.access_token,
        })
      );

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
      api.dispatch(clearUser());

      api.dispatch(setLoginModalIsOpen(true));
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
  tagTypes: ["Address", "Invoice", "Cart", "Order", "Products"],
});
