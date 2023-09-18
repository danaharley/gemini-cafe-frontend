import { apiSlice } from "../../apiSlice";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (data) => ({
        url: "/orders",
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["Order"],
    }),
    getOrders: builder.query({
      query: ({ limit, skip }) => ({
        url: `/orders?limit=${limit}&skip=${skip}`,
      }),
    }),
  }),
});

export const { useCreateOrderMutation, useGetOrdersQuery } = orderApiSlice;
