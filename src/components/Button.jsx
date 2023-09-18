import React from "react";

const Button = ({ label, onClick, disabled, outline, icon: Icon }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center justify-center gap-3 border-2 text-base font-semibold transition duration-200 hover:bg-indigo-500 hover:text-white hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-70 ${
        outline
          ? "border-indigo-400 bg-white text-neutral-800"
          : "border-indigo-500 bg-indigo-500 text-white"
      } ${Icon ? "rounded-full p-2 md:p-2.5" : "w-full rounded-lg py-3"}`}
    >
      {Icon ? (
        <Icon className="text-base text-neutral-800 hover:text-white md:text-xl" />
      ) : (
        label
      )}
    </button>
  );
};

export default Button;
