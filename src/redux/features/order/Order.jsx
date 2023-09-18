import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetCartQuery } from "../cart/cartApiSlice";
import { useGetAddressesQuery } from "../address/addressApiSlice";
import { useCreateOrderMutation } from "./orderApiSlice";
import { clearItem } from "../cart/cartSlice";
import { toast } from "react-hot-toast";
import { config } from "../../../config";
import Loading from "../../../components/Loading";
import Heading from "../../../components/Heading";
import CartItem from "../cart/CartItem";
import { formatPrice } from "../../../helpers/formatPrice";
import { sumPrice } from "../../../helpers/sumPrice";
import Button from "../../../components/Button";
import { setAddressModalIsOpen } from "../modal/modalSlice";
import AddressList from "../address/AddressList";
import Pagination from "../../../components/Pagination";
import {
  setCurrentPage,
  setNextPage,
  setPrevPage,
} from "../address/addressSlice";

const Order = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedAddress, setSelectedAddress] = useState(null);

  const { currentPage, perPage } = useSelector((state) => state.address);

  const params = {
    limit: perPage,
    skip: currentPage * perPage - perPage,
  };

  const {
    isLoading: cartIsLoading,
    isFetching: cartIsFetching,
    isError: cartIsError,
    error: cartError,
    isSuccess: cartIsSuccess,
    data: cartData,
  } = useGetCartQuery();

  const { isSuccess: addressIsSuccess, data: addressData } =
    useGetAddressesQuery(params);

  const [
    createOrder,
    {
      isLoading: orderIsLoading,
      isError: orderIsError,
      error: orderError,
      isSuccess: orderIsSuccess,
      data: orderData,
    },
  ] = useCreateOrderMutation();

  useEffect(() => {
    if (cartIsError) {
      console.log("cart error", cartError);
    }
  }, [cartError, cartIsError]);

  useEffect(() => {
    if (orderIsSuccess) {
      dispatch(clearItem());
      navigate(`/invoice/${orderData._id}`);
    }

    if (orderIsError) {
      console.log("error", orderError);
      toast.error(orderError.data.message);
    }
  }, [orderData, orderIsError, orderError, orderIsSuccess, dispatch, navigate]);

  const loading = cartIsLoading || cartIsFetching;

  const onChangeHandler = (e) => {
    setSelectedAddress(e.target.value);
  };

  const createOrderHandler = () => {
    const payload = {
      delivery_fee: config.delivery_fee,
      delivery_address: selectedAddress,
    };

    createOrder(payload);
  };

  return (
    <>
      {loading && <Loading />}
      <div className="grid pb-8 pt-32 sm:pt-16 lg:grid-cols-2">
        <div className="m-2 sm:pt-5 md:pt-7">
          <Heading
            title="Order Summary"
            subtitle="Check your items. And select a suitable shipping method."
          />
          <div className="mt-8 rounded-t-lg border bg-white px-2 py-4 shadow sm:px-6">
            <div className="flow-root">
              <ul className="px-2">
                {cartIsSuccess && cartData.length ? (
                  cartData.map((item) => (
                    <CartItem
                      key={item._id}
                      name={item.name}
                      price={item.price}
                      qty={item.qty}
                      imgSrc={item.image}
                    />
                  ))
                ) : (
                  <Heading
                    center
                    title="No Record"
                    subtitle="You have no items in your shopping cart"
                  />
                )}
              </ul>
            </div>
          </div>
          <div className="border border-t-0 bg-white px-2 py-4 shadow sm:px-6">
            <div className="flex items-center justify-between">
              <p className="text-neutral-400">Subtotal</p>
              <p className="text-lg font-semibold text-neutral-800">
                {cartIsSuccess &&
                  cartData &&
                  formatPrice(sumPrice(cartData, 0))}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-neutral-400">Shipping</p>
              <p className="text-lg font-semibold text-neutral-800">
                {formatPrice(config.delivery_fee)}
              </p>
            </div>
          </div>
          <div className="space-y-3 rounded-b-lg border border-t-0 bg-white px-2 py-4 shadow sm:px-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-neutral-800">Total</p>
              <p className="text-2xl font-semibold text-neutral-800">
                <span className="text-xs font-normal text-neutral-800">
                  IDR
                </span>
                {cartIsSuccess &&
                  cartData &&
                  formatPrice(sumPrice(cartData, config.delivery_fee))}
              </p>
            </div>
          </div>
        </div>
        <div className="m-2 rounded-b-lg rounded-t-lg bg-neutral-100 py-5 md:pt-7 lg:rounded-t-none">
          <div className="flex flex-col justify-between px-5 pb-3 sm:flex-row sm:items-center">
            <Heading
              title="Shipping Address"
              subtitle="Select your shipping address"
            />
            <div className="my-5 w-1/2 sm:my-0 sm:w-1/3">
              <Button
                label="Add Address"
                onClick={() => dispatch(setAddressModalIsOpen(true))}
              />
            </div>
          </div>
          <div className="px-5 sm:mt-5">
            {addressIsSuccess && addressData ? (
              addressData.data.map((address) => (
                <div className="mb-5" key={address._id}>
                  <AddressList
                    name={address.name}
                    details={address.details}
                    provinces={address.provinces}
                    regencies={address.regencies}
                    districts={address.districts}
                    villages={address.villages}
                    value={address._id}
                    checked={selectedAddress === address._id}
                    onChange={onChangeHandler}
                    id={address._id}
                  />
                </div>
              ))
            ) : (
              <div className="rounded-lg border px-2 py-4 shadow sm:px-6">
                <Heading
                  center
                  title="No Record"
                  subtitle="You have no shipping address"
                />
              </div>
            )}

            <Pagination
              currentPage={currentPage}
              totalCount={addressIsSuccess && addressData.count}
              pageSize={perPage}
              onPage={(page) => dispatch(setCurrentPage(page))}
              onNext={() => dispatch(setNextPage())}
              onPrev={() => dispatch(setPrevPage())}
            />

            <div className="mt-5">
              <Button
                label="Checkout"
                disabled={orderIsLoading}
                onClick={createOrderHandler}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Order;
