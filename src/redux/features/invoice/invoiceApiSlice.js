import { apiSlice } from "../../apiSlice";

export const invoiceApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    InitiatePayment: builder.query({
      query: (orderId) => ({
        url: `/invoices/${orderId}/initiate-payment`,
      }),
    }),

    getInvoice: builder.query({
      query: (orderId) => ({
        url: `/invoices/${orderId}`,
      }),

      // providesTags: (result) =>
      //   result
      //     ? [
      //         { type: "Invoice", id: result._id },
      //         { type: "Invoice", id: "LIST" },
      //       ]
      //     : [{ type: "Invoice", id: "LIST" }],
    }),
  }),
});

export const { useGetInvoiceQuery, useInitiatePaymentQuery } = invoiceApiSlice;
