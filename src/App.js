import React from "react";
import { Route, Routes } from "react-router-dom";
import ProductDetail from "./redux/features/product/ProductDetail";
import Layout from "./layout/Layout";
import ToasterProvider from "./components/ToasterProvider";
import LoginFormModal from "./redux/features/auth/LoginFormModal";
import RegisterFormModal from "./redux/features/auth/RegisterFormModal";
import AddressFormModal from "./redux/features/address/AddressFormModal";
import CheckoutLayout from "./layout/CheckoutLayout";
import RequireAuth from "./components/RequireAuth";
import Invoice from "./redux/features/invoice/Invoice";
import Order from "./redux/features/order/Order";
import Home from "./redux/features/home";
import Orders from "./redux/features/order/Orders";
import NotFound from "./components/NotFound";

const App = () => {
  return (
    <>
      <ToasterProvider />

      <LoginFormModal />
      <RegisterFormModal />

      <AddressFormModal />

      <Routes>
        <Route index element={<Home />} />

        <Route element={<Layout />}>
          <Route path="products/:id" element={<ProductDetail />} />
        </Route>

        <Route element={<RequireAuth />}>
          <Route element={<CheckoutLayout />}>
            <Route path="checkout" element={<Order />} />
            <Route path="invoice/:order_id" element={<Invoice />} />
          </Route>

          <Route element={<Layout />}>
            <Route path="orders" element={<Orders />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
