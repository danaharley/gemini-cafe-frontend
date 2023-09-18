import React from "react";
import { FiChevronRight } from "react-icons/fi";
import { MdDone } from "react-icons/md";
import { useLocation } from "react-router-dom";

const CheckoutStep = () => {
  const { pathname } = useLocation();
  const active = pathname.split("/")[1];

  switch (active) {
    case "checkout":
      return (
        <>
          <li className="flex items-center space-x-3 text-left sm:space-x-4">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700">
              <MdDone className="h-4 w-4" />
            </div>
            <span className="font-semibold text-neutral-800">Shop</span>
          </li>
          <FiChevronRight className="h-5 w-5 text-neutral-400" />
          <li className="flex items-center space-x-3 text-left sm:space-x-4">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-neutral-600 text-xs font-semibold text-white ring ring-neutral-600 ring-offset-2">
              2
            </div>
            <span className="font-semibold text-neutral-800">Shipping</span>
          </li>
          <FiChevronRight className="h-5 w-5 text-neutral-400" />
          <li className="flex items-center space-x-3 text-left sm:space-x-4">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-neutral-400 text-xs font-semibold text-white">
              3
            </div>
            <span className="font-semibold text-neutral-500">Invoice</span>
          </li>
        </>
      );

    case "invoice":
      return (
        <>
          <li className="flex items-center space-x-3 text-left sm:space-x-4">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700">
              <MdDone className="h-4 w-4" />
            </div>
            <span className="font-semibold text-neutral-800">Shop</span>
          </li>
          <FiChevronRight className="h-5 w-5 text-neutral-400" />
          <li className="flex items-center space-x-3 text-left sm:space-x-4">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700">
              <MdDone className="h-4 w-4" />
            </div>
            <span className="font-semibold text-neutral-800">Shipping</span>
          </li>
          <FiChevronRight className="h-5 w-5 text-neutral-400" />
          <li className="flex items-center space-x-3 text-left sm:space-x-4">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700">
              <MdDone className="h-4 w-4" />
            </div>
            <span className="font-semibold text-neutral-800">Invoice</span>
          </li>
        </>
      );

    default:
      return <div />;
  }
};

export default CheckoutStep;
