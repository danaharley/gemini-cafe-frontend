import { apiSlice } from "../../apiSlice";

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    categories: builder.query({
      query: () => ({
        url: "/categories",
      }),
    }),
  }),
});

export const { useCategoriesQuery } = categoryApiSlice;
