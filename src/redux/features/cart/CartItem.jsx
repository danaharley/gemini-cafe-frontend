import React from "react";
import { BiPlus, BiMinus } from "react-icons/bi";
import { formatPrice } from "../../../helpers/formatPrice";
import { config } from "../../../config";
import LazyImage from "../../../components/LazyImage";

const CartItem = ({
  id,
  qty,
  imgSrc,
  alt,
  name,
  price,
  onDecrease,
  onIncrease,
  onDelete,
}) => {
  return (
    <li className="flex flex-col space-y-3 py-3 text-left sm:flex-row sm:space-x-5 sm:space-y-0">
      <div className="relative shrink-0">
        <span className="absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full border bg-white text-sm font-medium text-gray-500 shadow sm:-right-2 sm:-top-2">
          {qty}
        </span>
        <LazyImage
          id={id}
          imgSrc={config.server.image_url + imgSrc}
          alt={alt}
          className="h-24 w-24 max-w-full rounded-lg object-cover"
        />
      </div>

      <div className="relative flex flex-1 flex-col justify-between">
        <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
          <div className="pr-8 sm:pr-5">
            <p className="text-base font-semibold text-gray-900">{name}</p>
            <p className="mx-0 mb-0 mt-1 text-sm text-gray-400">36EU - 4US</p>
          </div>

          <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
            <p className="w-20 shrink-0 text-sm font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">
              {formatPrice(price)}
            </p>
          </div>
        </div>

        {onDecrease || onIncrease || onDelete ? (
          <div className="absolute right-0 top-0 flex gap-3 sm:bottom-0 sm:top-auto">
            <button
              onClick={onDecrease}
              className="flex rounded border p-2 text-center text-gray-500 transition-all duration-200 ease-in-out hover:text-gray-900 focus:border-yellow-500 focus:text-yellow-500 focus:shadow"
            >
              <BiMinus className="text-lg" />
            </button>

            <button
              onClick={onIncrease}
              className="flex rounded border p-2 text-center text-gray-500 transition-all duration-200 ease-in-out hover:text-gray-900 focus:border-indigo-500 focus:text-indigo-500 focus:shadow"
            >
              <BiPlus className="text-lg" />
            </button>
          </div>
        ) : null}
      </div>
    </li>
  );
};

export default CartItem;
