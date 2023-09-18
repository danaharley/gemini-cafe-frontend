import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Container from "../components/Container";

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="pt-24 md:pt-28">
        <Container>
          <Outlet />
        </Container>
      </div>
    </>
  );
};

export default Layout;
