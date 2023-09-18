import { apiSlice } from "../../apiSlice";

export const cartApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => ({
        url: "carts",
      }),
      providesTags: (result) =>
        result
          ? [
              result.map(({ _id }) => ({ type: "Cart", id: _id })),
              { type: "Cart", id: "LIST" },
            ]
          : [{ type: "Cart", id: "LIST" }],
    }),
    saveCart: builder.mutation({
      query: (data) => ({
        url: "carts",
        method: "PUT",
        body: { items: data },
      }),
      invalidatesTags: [{ type: "Cart", id: "LIST" }],
    }),
  }),
});

export const { useGetCartQuery, useSaveCartMutation } = cartApiSlice;
