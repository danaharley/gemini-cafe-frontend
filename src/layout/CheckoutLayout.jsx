import React from "react";
import Container from "../components/Container";
import Logo from "../components/Logo";
import { Outlet } from "react-router-dom";
import CheckoutStep from "../components/CheckoutStep";

const CheckoutLayout = () => {
  return (
    <>
      <div className="fixed z-10 w-full bg-white">
        <div className="border-b border-b-neutral-100 py-4">
          <Container>
            <div className="flex flex-col items-center bg-white sm:flex-row">
              <Logo />
              <div className="mt-4 py-2 text-xs sm:ml-auto sm:mt-0 sm:text-base">
                <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
                  <CheckoutStep />
                </ul>
              </div>
            </div>
          </Container>
        </div>
      </div>
      <Container>
        <Outlet />
      </Container>
    </>
  );
};

export default CheckoutLayout;
