import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  useGetInvoiceQuery,
  useInitiatePaymentQuery,
} from "../redux/features/invoice/invoiceApiSlice";
import { toast } from "react-hot-toast";

const useInvoice = (order_id) => {
  const navigate = useNavigate();

  const {
    isError: invoiceIsError,
    error: invoiceError,
    isFetching: invoiceIsFetching,
    isLoading: invoiceIsLoading,
    isSuccess: invoiceIsSuccess,
    data: invoiceData,
  } = useGetInvoiceQuery(order_id);

  const {
    isError: initiatePayIsError,
    error: initiatePayError,
    isSuccess: initiatePayIsSuccess,
    data: initiatePayData,
  } = useInitiatePaymentQuery(order_id, {
    skip: invoiceData?.payment_status !== "waiting_payment",
  });

  const loadingInvoice = invoiceIsFetching || invoiceIsLoading;

  useEffect(() => {
    if (initiatePayIsError) {
      toast.error("Failed to fetch snap token");
    }

    if (invoiceIsError) {
      toast.error(invoiceError.data.message);
    }
  }, [initiatePayError, initiatePayIsError, invoiceIsError, invoiceError]);

  const onPaymnetHandler = () => {
    try {
      if (initiatePayIsSuccess) {
        window.snap.pay(initiatePayData?.token, {
          onSuccess: function (result) {
            toast.success("Payment success!");
            navigate(`/invoice/${order_id}`);
          },
          onPending: function (result) {
            console.log("pending");
          },
          onError: function (result) {
            console.log("error");
          },
          onClose: function () {
            console.log(
              "customer closed the popup without finishing the payment"
            );
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return { invoiceIsSuccess, invoiceData, loadingInvoice, onPaymnetHandler };
};

export default useInvoice;
