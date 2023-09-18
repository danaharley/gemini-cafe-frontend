import { apiSlice } from "../../apiSlice";
import { setUser } from "./userSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    me: builder.query({
      query: () => ({
        url: "/users/me",
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useMeQuery } = userApiSlice;
