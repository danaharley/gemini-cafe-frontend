import React from "react";

const CategoryItem = ({ label, icon: Icon, selected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`flex shrink-0 cursor-pointer flex-col items-center justify-center gap-2 border-b-2 p-3 transition hover:text-neutral-800 ${
        selected
          ? "border-b-neutral-800 text-neutral-800"
          : "border-transparent text-neutral-500"
      }`}
    >
      <Icon className="text-2xl md:text-3xl" />
      <div className="text-xs font-medium md:text-sm">{label}</div>
    </div>
  );
};

export default CategoryItem;
