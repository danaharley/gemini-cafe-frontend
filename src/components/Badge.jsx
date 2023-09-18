import React from "react";

const Badge = ({ bgColor, txtColor, count }) => {
  return (
    <span className={`z-50 ml-2 rounded-lg p-1 ${bgColor}`}>
      <h6 className={`text-xs ${txtColor}`}>{count}</h6>
    </span>
  );
};

export default Badge;
