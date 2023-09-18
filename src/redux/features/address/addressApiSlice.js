import { apiSlice } from "../../apiSlice";

export const addressApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRegion: builder.query({
      query: ({ tingkat, kodeInduk }) => ({
        url: `/wilayah/${tingkat}?kode_induk=${kodeInduk}`,
      }),
    }),
    getAddresses: builder.query({
      query: ({ limit, skip }) => ({
        url: `/delivery-addresses?limit=${limit}&skip=${skip}`,
      }),
      providesTags: (result) =>
        result
          ? [
              result.data.map(({ _id }) => ({ type: "Address", id: _id })),
              { type: "Address", id: "LIST" },
            ]
          : [{ type: "Address", id: "LIST" }],
    }),
    addAddress: builder.mutation({
      query: (data) => ({
        url: "/delivery-address",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Address", id: "LIST" }],
    }),
  }),
});

export const {
  useGetRegionQuery,
  useGetAddressesQuery,
  useAddAddressMutation,
} = addressApiSlice;
