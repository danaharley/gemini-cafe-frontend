import React, { useEffect, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { HiOutlineArrowSmRight } from "react-icons/hi";
import Drawer from "../../../components/Drawer";
import CartItem from "./CartItem";
import Heading from "../../../components/Heading";
import { sumPrice } from "../../../helpers/sumPrice";
import { formatPrice } from "../../../helpers/formatPrice";
import { config } from "../../../config";
import { useDispatch } from "react-redux";
import { useSaveCartMutation } from "./cartApiSlice";
import { toast } from "react-hot-toast";
import { setLoginModalIsOpen } from "../modal/modalSlice";
import { useNavigate } from "react-router-dom";
import { clearItem, decreaseItem, increaseItem } from "./cartSlice";

const DrawerCart = ({ items }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [drawerCartIsOpen, setDrawerCartIsOpen] = useState(false);

  const [
    saveCart,
    {
      isError: saveCartisError,
      error: saveCartError,
      isLoading: saveCartIsLoading,
      isSuccess: saveCartIsSuccess,
    },
  ] = useSaveCartMutation();

  useEffect(() => {
    if (saveCartIsSuccess) {
      navigate("/checkout");
    }

    if (saveCartisError) {
      toast.error(saveCartError.data.message);
      if (
        saveCartError.data.message === "You are not logged in" ||
        saveCartError.data.message === "Invalid token or user doesn't exist"
      ) {
        dispatch(setLoginModalIsOpen(true));
      }
    }
  }, [saveCartisError, saveCartError, saveCartIsSuccess, dispatch, navigate]);

  const processToCheckoutHandler = () => {
    saveCart(items);
  };

  let bodyContent = (
    <div className="px-4 py-6 sm:px-8 sm:py-10">
      {!items.length ? (
        <Heading center title="No Record" subtitle="Add some items" />
      ) : (
        <>
          <div className="flow-root">
            <ul className="-my-8">
              {items.map((item) => (
                <CartItem
                  key={item._id}
                  id={item._id}
                  name={item.name}
                  qty={item.qty}
                  imgSrc={item.image}
                  alt={item.name}
                  price={item.price}
                  onDecrease={() => dispatch(decreaseItem(item))}
                  onIncrease={() => dispatch(increaseItem(item))}
                />
              ))}
            </ul>
          </div>
          <hr className="mx-0 mb-0 mt-9 h-0 border-b-0 border-l-0 border-r-0 border-t border-solid border-neutral-300" />
          {items.length && (
            <div className="-mb-5 flex items-center justify-end">
              <div
                className="my-2 w-fit cursor-pointer rounded-md bg-red-500 px-3 py-2 font-semibold text-white"
                onClick={() => dispatch(clearItem())}
              >
                Clear cart
              </div>
            </div>
          )}
        </>
      )}

      <div className="mt-5 space-y-3 border-b border-t py-8">
        <div className="flex items-center justify-between">
          <p className="text-neutral-400">Subtotal</p>
          <p className="text-lg font-semibold text-neutral-900">
            {formatPrice(sumPrice(items, 0))}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-neutral-400">Shipping</p>
          <p className="text-lg font-semibold text-neutral-800">
            {formatPrice(config.delivery_fee)}
          </p>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm font-medium text-neutral-800">Total</p>
        <p className="text-2xl font-semibold text-neutral-800">
          <span className="text-xs font-normal text-neutral-400">IDR</span>
          {formatPrice(sumPrice(items, config.delivery_fee))}
        </p>
      </div>

      <div className="mt-6 text-center" onClick={processToCheckoutHandler}>
        <button
          disabled={!items.length || saveCartIsLoading}
          className="group inline-flex w-full items-center justify-center rounded-md bg-indigo-500 px-6 py-4 text-lg font-semibold uppercase text-white transition-all duration-200 ease-in-out hover:bg-neutral-800 focus:shadow disabled:cursor-not-allowed disabled:opacity-70"
        >
          {saveCartIsLoading ? "Processing" : "Process to checkout"}
          <HiOutlineArrowSmRight className="ml-4 h-6 w-6 transition-all group-hover:ml-8" />
        </button>
      </div>
    </div>
  );

  return (
    <Drawer
      label="Cart"
      isOpen={drawerCartIsOpen}
      badge={items.length}
      icon={AiOutlineShoppingCart}
      onOpen={() => setDrawerCartIsOpen(!drawerCartIsOpen)}
      onClose={() => setDrawerCartIsOpen(!drawerCartIsOpen)}
      body={bodyContent}
    />
  );
};

export default DrawerCart;
