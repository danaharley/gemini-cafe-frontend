import React from "react";
import { Link } from "react-router-dom";
import { GrRestaurant } from "react-icons/gr";

const Logo = () => {
  return (
    <Link to="/">
      <div className="flex flex-row items-center gap-2">
        <GrRestaurant size={26} />
        <h1 className="text-xl tracking-wider text-neutral-800">Gemini Cafe</h1>
      </div>
    </Link>
  );
};

export default Logo;
