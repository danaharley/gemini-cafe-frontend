import React from "react";
import Container from "./Container";
import Logo from "./Logo";
import UserMenu from "../redux/features/user/UserMenu";
import { useSelector } from "react-redux";
import Search from "./Search";
import DrawerCart from "../redux/features/cart/DrawerCart";
import { useLocation } from "react-router-dom";

const Navbar = ({ category }) => {
  const { pathname } = useLocation();

  const { user } = useSelector((state) => state.persistedReducer.user);
  const items = useSelector((state) => state.persistedReducer.cart);

  return (
    <div className="fixed z-10 w-full bg-white shadow-sm">
      <div className="border-b border-b-neutral-100 py-4">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <div className="flex items-center gap-3">
              {pathname === "/" && <Search />}
              <DrawerCart items={items} />
              <UserMenu currentUser={user} />
            </div>
          </div>
        </Container>
      </div>
      {category}
    </div>
  );
};

export default Navbar;
