import React from "react";
import { BiDollar } from "react-icons/bi";

const Input = ({
  id,
  label,
  type = "text",
  disabled,
  required,
  min,
  formatPrice,
  register,
  errors,
}) => {
  return (
    <div className="relative w-full">
      {formatPrice && (
        <BiDollar
          size={24}
          className="absolute left-2 top-5 text-neutral-800"
        />
      )}
      <input
        type={type}
        id={id}
        disabled={disabled}
        min={min}
        {...register(id, { required })}
        className={`peer w-full rounded-md border-2 bg-white p-4 pt-6 font-light outline-none transition disabled:cursor-not-allowed disabled:opacity-70 ${
          formatPrice ? "pl-9" : "pl-4"
        } ${
          errors[id]
            ? "border-red-500 focus:border-red-500"
            : "border-neutral-300 focus:border-neutral-800"
        }`}
        placeholder=" "
      />
      <label
        className={`absolute top-5 z-10 origin-[0] -translate-y-3 transform text-base duration-150 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 
        ${formatPrice ? "left-9" : "left-4"} 
        ${errors[id] ? "text-red-500" : "text-zinc-400"}`}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
