import React, { useEffect } from "react";
import { useGetOrdersQuery } from "./orderApiSlice";
import Heading from "../../../components/Heading";
import Loading from "../../../components/Loading";
import StatusLabel from "../../../components/StatusLabel";
import { BiDetail } from "react-icons/bi";
import { Link } from "react-router-dom";
import Pagination from "../../../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage, setNextPage, setPrevPage } from "./ordersSlice";

const Orders = () => {
  const dispatch = useDispatch();

  const { currentPage, perPage } = useSelector((state) => state.orders);

  const params = {
    limit: perPage,
    skip: currentPage * perPage - perPage,
  };

  const {
    isError: ordersIsError,
    error: ordersError,
    isLoading: ordersIsLoading,
    isFetching: ordersIsFetching,
    isSuccess: ordersIsSuccess,
    data: ordersData,
  } = useGetOrdersQuery(params);

  const loading = ordersIsLoading || ordersIsFetching;

  useEffect(() => {
    if (ordersIsError) {
      console.log(ordersError);
    }
  }, [ordersError, ordersIsError]);

  return (
    <>
      {loading && <Loading />}
      <h1 className="mb-6 text-xl font-medium md:text-2xl">My Lists Order</h1>
      <div className="mx-auto flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded border border-neutral-200 md:rounded-lg">
              <table className="min-w-full divide-y divide-neutral-200">
                <thead className="bg-neutral-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-left text-sm font-normal text-neutral-500"
                    >
                      <div className="flex items-center gap-x-3">
                        <button className="flex items-center gap-x-2">
                          <span>Order Number</span>
                        </button>
                      </div>
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-left text-sm font-normal text-neutral-500"
                    >
                      Items
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-left text-sm font-normal text-neutral-500"
                    >
                      Address
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-left text-sm font-normal text-neutral-500"
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 bg-white">
                  {ordersIsSuccess && ordersData.data.length ? (
                    ordersData.data.map((order) => (
                      <tr key={order._id}>
                        <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-neutral-700">
                          <div className="inline-flex items-center gap-x-3">
                            <span className="text-lg font-bold text-neutral-700">
                              {order.orderNumber}
                            </span>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-sm text-neutral-500">
                          <div className="flex items-center">
                            {`${order.order_items.length} Items`}
                            <div className="cursor-pointer p-3 text-blue-500">
                              <Link to={`/invoice/${order._id}`}>
                                <BiDetail size={18} />
                              </Link>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-sm uppercase text-neutral-500">
                          {order.delivery_address.province}
                          <br />
                          {order.delivery_address.regency},{" "}
                          {order.delivery_address.district},{" "}
                          {order.delivery_address.village},
                          <br />
                          {order.delivery_address.details},
                          <br />
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-neutral-700">
                          <StatusLabel status={order.status} />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        className="whitespace-nowrap px-4 py-4 text-sm font-medium"
                      >
                        <Heading center title="No Records" />
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="my-8">
        <Pagination
          currentPage={currentPage}
          totalCount={ordersIsSuccess && ordersData.count}
          pageSize={perPage}
          onPage={(page) => dispatch(setCurrentPage(page))}
          onNext={() => dispatch(setNextPage())}
          onPrev={() => dispatch(setPrevPage())}
        />
      </div>
    </>
  );
};

export default Orders;
