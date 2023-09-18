import { apiSlice } from "../../apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ limit, skip, q, category, tags }) => ({
        url: `/products?limit=${limit}&skip=${skip}&q=${q}&category=${category}&tags=${tags}`,
      }),
      providesTags: (result) =>
        result
          ? [
              result.products.map(({ _id }) => ({ type: "Products", id: _id })),
              { type: "Products", id: "LIST" },
            ]
          : [{ type: "Products", id: "LIST" }],
    }),
    getProduct: builder.query({
      query: (id) => ({
        url: `/product/${id}`,
      }),
      providesTags: (result) =>
        result
          ? [
              { type: "Products", id: result.product._id },
              { type: "Products", id: "LIST" },
            ]
          : [{ type: "Products", id: "LIST" }],
    }),
  }),
});

export const { useGetProductsQuery, useGetProductQuery } = productApiSlice;
