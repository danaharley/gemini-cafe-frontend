import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BsCreditCard2Back } from "react-icons/bs";
import StatusLabel from "../../../components/StatusLabel";
import { formatPrice } from "../../../helpers/formatPrice";
import { config } from "../../../config";
import useInvoice from "../../../hooks/useInvoice";
import Loading from "../../../components/Loading";
import Heading from "../../../components/Heading";

const Invoice = () => {
  const { order_id } = useParams();

  const { invoiceIsSuccess, invoiceData, loadingInvoice, onPaymnetHandler } =
    useInvoice(order_id);

  useEffect(() => {
    const snapSrcUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    const myMidtransClientKey = "SB-Mid-client-X2fDhNiTAZQ1zXRl";

    const script = document.createElement("script");
    script.src = snapSrcUrl;
    script.setAttribute("data-client-key", myMidtransClientKey);
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="grid bg-white pb-8 pt-32 sm:pt-16">
      {loadingInvoice && <Loading />}
      <div className="m-2 sm:pt-5 md:pt-7">
        {!loadingInvoice && invoiceIsSuccess && invoiceData !== undefined ? (
          <div className="mx-auto my-4 max-w-[85rem] px-4 sm:my-10 sm:px-6 lg:px-8">
            <div className="mb-5 flex items-center justify-between border-b border-neutral-200 pb-5">
              <div>
                <h2 className="text-2xl font-semibold text-neutral-800">
                  Invoice
                </h2>
              </div>

              {invoiceIsSuccess && invoiceData?.payment_status !== "paid" && (
                <div
                  className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-md border bg-slate-50 px-3 py-2 align-middle text-sm font-medium text-neutral-700 shadow-sm transition-all hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 focus:ring-offset-white"
                  onClick={onPaymnetHandler}
                >
                  <BsCreditCard2Back size={20} />
                  Pay Now
                </div>
              )}
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <div>
                <div className="grid space-y-3">
                  <dl className="grid gap-x-3 text-sm sm:flex">
                    <dt className="min-w-[150px] max-w-[200px] text-neutral-500">
                      Billed to:
                    </dt>
                    <dd className="text-neutral-800">
                      <span className="inline-flex items-center gap-x-1.5 font-medium text-indigo-600 decoration-2">
                        {invoiceData?.user?.fullname}
                      </span>
                    </dd>
                  </dl>

                  <dl className="grid gap-x-3 text-sm sm:flex">
                    <dt className="min-w-[150px] max-w-[200px] text-neutral-500">
                      Billing details:
                    </dt>
                    <dd className="font-medium text-neutral-800">
                      <span className="block font-semibold">
                        {invoiceData?.user?.fullname}
                      </span>
                      <address className="font-normal uppercase not-italic">
                        {invoiceData?.delivery_address?.province}
                        <br />
                        {invoiceData?.delivery_address?.regency},{" "}
                        {invoiceData?.delivery_address?.district},{" "}
                        {invoiceData?.delivery_address?.village},
                        <br />
                        {invoiceData?.delivery_address?.details},
                        <br />
                      </address>
                    </dd>
                  </dl>

                  <dl className="grid gap-x-3 text-sm sm:flex">
                    <dt className="min-w-[150px] max-w-[200px] text-neutral-500">
                      Shipping details:
                    </dt>
                    <dd className="font-medium text-neutral-800">
                      <span className="block font-semibold">
                        {invoiceData?.user?.fullname}
                      </span>
                      <address className="font-normal uppercase not-italic">
                        {invoiceData?.delivery_address?.province}
                        <br />
                        {invoiceData?.delivery_address?.regency},{" "}
                        {invoiceData?.delivery_address?.district},{" "}
                        {invoiceData?.delivery_address?.village},
                        <br />
                        {invoiceData?.delivery_address?.details},
                        <br />
                      </address>
                    </dd>
                  </dl>
                </div>
              </div>

              <div>
                <div className="grid space-y-3">
                  <dl className="grid gap-x-3 text-sm sm:flex">
                    <dt className="min-w-[150px] max-w-[200px] text-neutral-500">
                      Order number:
                    </dt>
                    <dd className="font-medium text-neutral-800">
                      {invoiceData?.order?.orderNumber}
                    </dd>
                  </dl>

                  <dl className="grid gap-x-3 text-sm sm:flex">
                    <dt className="min-w-[150px] max-w-[200px] text-neutral-500">
                      Currency:
                    </dt>
                    <dd className="font-medium text-neutral-800">
                      IDR - Rupiah
                    </dd>
                  </dl>

                  <dl className="grid gap-x-3 text-sm sm:flex">
                    <dt className="min-w-[150px] max-w-[200px] text-neutral-500">
                      Due date:
                    </dt>
                    <dd className="font-medium text-neutral-800">
                      10 Jan 2023{" "}
                      <span className="italic text-neutral-300">
                        (cooming soon)
                      </span>
                    </dd>
                  </dl>

                  <dl className="grid gap-x-3 text-sm sm:flex">
                    <dt className="min-w-[150px] max-w-[200px] text-neutral-500">
                      Status:
                    </dt>
                    <dd className="font-medium text-neutral-800">
                      <StatusLabel status={invoiceData?.payment_status} />
                    </dd>
                  </dl>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-4 rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
              <div className="hidden sm:grid sm:grid-cols-5">
                <div className="text-xs font-medium uppercase text-neutral-500 sm:col-span-2">
                  Item
                </div>
                <div className="text-left text-xs font-medium uppercase text-neutral-500">
                  Qty
                </div>
                <div className="text-right text-xs font-medium uppercase text-neutral-500">
                  Amount
                </div>
              </div>

              <div className="hidden border-b border-neutral-200 dark:border-neutral-700 sm:block" />

              {invoiceData?.order?.order_items?.map((item) => (
                <div
                  className="grid grid-cols-3 gap-2 sm:grid-cols-5"
                  key={item._id}
                >
                  <div className="col-span-full sm:col-span-2">
                    <h5 className="text-xs font-medium uppercase text-neutral-500 sm:hidden">
                      Item
                    </h5>
                    <p className="font-medium text-neutral-800">{item.name}</p>
                  </div>
                  <div>
                    <h5 className="text-xs font-medium uppercase text-neutral-500 sm:hidden">
                      Qty
                    </h5>
                    <p className="text-neutral-800">{item.qty}</p>
                  </div>
                  <div>
                    <h5 className="text-xs font-medium uppercase text-neutral-500 sm:hidden">
                      Amount
                    </h5>
                    <p className="text-neutral-800 sm:text-right">
                      {formatPrice(item.price)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex sm:justify-end">
              <div className="w-full max-w-2xl space-y-2 sm:text-right">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-1 sm:gap-2">
                  <dl className="grid gap-x-3 text-sm sm:grid-cols-5">
                    <dt className="col-span-3 text-neutral-500">Subtotal:</dt>
                    <dd className="col-span-2 font-medium text-neutral-800">
                      {invoiceIsSuccess
                        ? formatPrice(invoiceData?.sub_total)
                        : 0}
                    </dd>
                  </dl>

                  <dl className="grid gap-x-3 text-sm sm:grid-cols-5">
                    <dt className="col-span-3 text-neutral-500">Ongkir:</dt>
                    <dd className="col-span-2 font-medium text-neutral-800">
                      {formatPrice(config.delivery_fee)}
                    </dd>
                  </dl>

                  <dl className="grid gap-x-3 text-sm sm:grid-cols-5">
                    <dt className="col-span-3 text-neutral-500">Total:</dt>
                    <dd className="col-span-2 font-medium text-neutral-800">
                      {invoiceIsSuccess ? formatPrice(invoiceData?.total) : 0}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-10">
            <Heading center title="No Result Found" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Invoice;
